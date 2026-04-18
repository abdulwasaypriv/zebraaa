import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { resume, name } = await req.json();

    if (!resume) {
      return new Response(JSON.stringify({ error: "resume is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const apiKey = Deno.env.get("GEMINI_API_KEY") || Deno.env.get("OPENAI_API_KEY");
    const devName = name || "Developer";

    if (!apiKey) {
      const bios = generateTemplateBios(devName, resume);
      return new Response(JSON.stringify(bios), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const isGemini = !!Deno.env.get("GEMINI_API_KEY");

    if (isGemini) {
      const prompt = buildPrompt(devName, resume);
      const geminiRes = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.8, maxOutputTokens: 800 },
          }),
        }
      );
      const geminiData = await geminiRes.json();
      const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      const parsed = parseBiosFromText(text, devName, resume);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } else {
      const prompt = buildPrompt(devName, resume);
      const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.8,
          max_tokens: 800,
        }),
      });
      const openaiData = await openaiRes.json();
      const text = openaiData?.choices?.[0]?.message?.content || "";
      const parsed = parseBiosFromText(text, devName, resume);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

function buildPrompt(name: string, resume: string): string {
  return `You are a GitHub profile bio writer. Given a developer's resume/experience below, generate exactly 3 distinct bio styles for their GitHub profile.

Developer name: ${name}
Resume/Experience:
${resume}

Return ONLY a JSON object in this exact format, no other text:
{
  "professional": "A concise, results-oriented professional bio (2-3 sentences, suitable for job applications)",
  "creative": "A fun, personality-driven bio that showcases passion (2-3 sentences, can use emojis)",
  "minimalist": "An ultra-short, punchy bio (1 sentence or tagline format)"
}`;
}

function parseBiosFromText(text: string, name: string, _resume: string) {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.professional && parsed.creative && parsed.minimalist) {
        return parsed;
      }
    }
  } catch {
    // fall through
  }
  return generateTemplateBios(name, _resume);
}

function generateTemplateBios(name: string, resume: string) {
  const firstLine = resume.split("\n").find(l => l.trim().length > 5)?.replace(/^[•\-*]\s*/, "") || "";
  return {
    professional: `Results-driven software developer${firstLine ? ` with expertise in ${firstLine}` : ""}. Passionate about building scalable, maintainable systems and contributing to the open source community. Always focused on writing clean, efficient code that makes a real impact.`,
    creative: `Code poet by day, open source enthusiast by night ✨ I turn complex problems into elegant solutions and love the intersection of creativity and technology. ${firstLine ? `Currently obsessed with ${firstLine}` : "Always learning, always building."} — Let's create something amazing together!`,
    minimalist: `${name || "Developer"}. Builder. Open source contributor. I write code that matters.`,
  };
}
