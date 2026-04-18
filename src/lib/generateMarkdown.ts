import { ProfileData } from '../types';
import { TECH } from './techData';

export function generateMarkdown(data: ProfileData): string {
  const username = data.username || 'your-username';
  const name = data.name || username;
  const theme = data.statsTheme;
  const isCenter = data.layout === 'center';
  const align = isCenter ? 'center' : 'left';

  let md = '';

  md += `<h1 align="${align}">Hi 👋, I'm ${name}</h1>\n`;
  if (data.tagline) md += `<h3 align="${align}">${data.tagline}</h3>\n\n`;

  if (data.showVisitors && username !== 'your-username') {
    md += `<p align="${align}"> <img src="https://komarev.com/ghpvc/?username=${username}&label=Profile%20views&color=0e75b6&style=flat" alt="${username}" /> </p>\n\n`;
  }

  if (data.bio) {
    md += `<p align="${align}">${data.bio}</p>\n\n`;
  }

  const bullets = [
    data.working,
    data.learning,
    data.askme ? `💬 Ask me about **${data.askme}**` : '',
    data.funfact,
  ].filter(Boolean);

  if (bullets.length) {
    md += bullets.map(b => `- ${b}`).join('\n') + '\n\n';
  }

  // Social links
  const socialBadges: string[] = [];
  if (data.twitter) socialBadges.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${data.twitter})`);
  if (data.linkedin) socialBadges.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${data.linkedin})`);
  if (data.instagram) socialBadges.push(`[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/${data.instagram})`);
  if (data.email) socialBadges.push(`[![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${data.email})`);
  if (data.website) socialBadges.push(`[![Website](https://img.shields.io/badge/Website-000000?style=for-the-badge&logo=About.me&logoColor=white)](https://${data.website})`);
  if (data.youtube) socialBadges.push(`[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/${data.youtube})`);
  if (data.devto) socialBadges.push(`[![Dev.to](https://img.shields.io/badge/dev.to-0A0A0A?style=for-the-badge&logo=dev.to&logoColor=white)](https://dev.to/${data.devto})`);

  if (socialBadges.length) {
    md += `<h3 align="${align}">Connect with me:</h3>\n<p align="${align}">\n${socialBadges.join('\n')}\n</p>\n\n`;
  }

  // Tech Stack
  if (data.selectedTechs.size > 0) {
    md += `<h3 align="${align}">Languages and Tools:</h3>\n<p align="${align}">\n`;
    data.selectedTechs.forEach(i => {
      const t = TECH[i];
      md += `  <img src="${t.icon}" alt="${t.name}" height="30" style="margin: 4px"/>\n`;
    });
    md += `</p>\n\n`;
  }

  // Stats
  if (data.showStats) {
    md += `<p align="${align}"><img src="https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&locale=en" alt="${username}" /></p>\n\n`;
  }
  if (data.showLangs) {
    md += `<p align="${align}"><img src="https://github-readme-stats.vercel.app/api/top-langs?username=${username}&show_icons=true&locale=en&layout=compact&theme=${theme}" alt="${username}" /></p>\n\n`;
  }
  if (data.showStreak) {
    md += `<p align="${align}"><img src="https://streak-stats.demolab.com/?user=${username}&theme=${theme}" alt="${username}" /></p>\n\n`;
  }
  if (data.showTrophies) {
    md += `<p align="${align}"><a href="https://github.com/ryo-ma/github-profile-trophy"><img src="https://github-profile-trophy.vercel.app/?username=${username}&theme=${theme}" alt="${username}" /></a></p>\n\n`;
  }

  // Blog posts widget
  if (data.showBlogPosts && (data.mediumRss || data.devtoWidget)) {
    md += `### 📝 Latest Blog Posts\n`;
    md += `<!-- BLOG-POST-LIST:START -->\n<!-- BLOG-POST-LIST:END -->\n\n`;
    const feedUrl = data.mediumRss || `https://dev.to/feed/${data.devtoWidget}`;
    md += `> Auto-updated via GitHub Actions. See workflow below.\n\n`;
    md += `<details>\n<summary>📋 GitHub Action to auto-update blog posts</summary>\n\n\`\`\`yaml\n`;
    md += `name: Latest blog post workflow\non:\n  schedule:\n    - cron: '0 * * * *'\n  workflow_dispatch:\njobs:\n  update-readme-with-blog:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v3\n      - uses: gautamkrishnar/blog-post-workflow@v1\n        with:\n          feed_list: "${feedUrl}"\n\`\`\`\n</details>\n\n`;
  }

  // LeetCode stats
  if (data.showLeetcode && data.leetcodeUsername) {
    md += `### 🏅 LeetCode Stats\n`;
    md += `<p align="${align}">\n  <img src="https://leetcard.jacoblin.cool/${data.leetcodeUsername}?theme=dark&font=Baloo%202&ext=contest" alt="LeetCode Stats"/>\n</p>\n\n`;
  }

  // CodeWars stats
  if (data.showCodewars && data.codewarsUsername) {
    md += `### ⚔️ CodeWars\n`;
    md += `<p align="${align}">\n  <img src="https://www.codewars.com/users/${data.codewarsUsername}/badges/large" alt="CodeWars Badge"/>\n</p>\n\n`;
  }

  // Fun components
  if (data.showQuote) {
    md += `<p align="${align}">\n  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight" />\n</p>\n\n`;
  }
  if (data.showMeme) {
    md += `<p align="${align}">\n  <img src="https://random-memer.herokuapp.com/" title="Meme" alt="Please load again if meme not available" />\n</p>\n\n`;
  }
  if (data.showSnake) {
    md += `<p align="${align}">\n  <img src="https://github.com/${username}/${username}/blob/output/github-contribution-grid-snake.svg" alt="snake" />\n</p>\n\n`;
  }
  if (data.showSpotify && data.spotify) {
    md += `[![Spotify](https://novatorem.vercel.app/api/spotify)](https://open.spotify.com/user/${data.spotify})\n\n`;
  }

  // Support
  if (data.bmc || data.kofi) {
    md += `<h3>Support:</h3>\n<p>`;
    if (data.bmc) md += `<a href="https://www.buymeacoffee.com/${data.bmc}"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="${data.bmc}" /></a> `;
    if (data.kofi) md += `<a href="https://ko-fi.com/${data.kofi}"><img src="https://cdn.ko-fi.com/cdn/kofi3.png?v=3" height="50" width="210" alt="${data.kofi}" /></a>`;
    md += `</p>\n`;
  }

  return md;
}
