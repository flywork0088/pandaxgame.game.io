/* JVGC Studio · Games data
 *
 * Each entry MUST keep `name` / `tagline` / `category` as { en, zh } pairs.
 * Owner action items:
 *   - Fill `appStoreUrl` for each game (currently null → CTA button is disabled).
 *   - Drop 512×512 icon into `assets/games/<id>.png` (otherwise iconGradient is used).
 */
window.GAMES = [
  {
    id: 'tile-garden-match',
    name: { en: 'Tile Garden Match', zh: 'Tile Garden Match' },
    tagline: {
      en: 'A relaxing triple-tile puzzle. Match the same goods, clear the board, breathe easier.',
      zh: '放松向的三元素消除游戏。匹配同款物件，清空版面，深呼吸。'
    },
    category: { en: 'Triple Match', zh: '三元素消除' },
    icon: 'assets/games/tile-garden-match.png',
    iconGradient: 'linear-gradient(135deg, #f8e1a8, #e3a857)',
    appStoreUrl: 'https://apps.apple.com/us/app/tile-garden-match/id6765991907'
  },
  {
    id: 'ludo',
    name: { en: 'LUDO', zh: '经典飞行棋-LUDO' },
    tagline: {
      en: 'Classic family board game with smooth online play.',
      zh: '合家欢的经典飞行棋，丝滑流畅的对局体验。'
    },
    category: { en: 'Board · Classic', zh: '棋盘 · 经典' },
    icon: 'assets/games/ludo.png',
    iconGradient: 'linear-gradient(135deg, #b8e0c2, #4ea871)',
    appStoreUrl: 'https://apps.apple.com/us/app/%E7%BB%8F%E5%85%B8%E9%A3%9E%E8%A1%8C%E6%A3%8B-ludo/id6745114688'
  },
  {
    id: 'connect-4',
    name: { en: 'Connect 4', zh: '重力四子棋-经典版' },
    tagline: {
      en: 'The classic 4-in-a-row strategy with clean modern visuals.',
      zh: '记忆中的四连珠策略，配上干净现代的视觉。'
    },
    category: { en: 'Strategy · Classic', zh: '策略 · 经典' },
    icon: 'assets/games/connect-4.png',
    iconGradient: 'linear-gradient(135deg, #c8d6f0, #5874c2)',
    appStoreUrl: 'https://apps.apple.com/us/app/%E9%87%8D%E5%8A%9B%E5%9B%9B%E5%AD%90%E6%A3%8B-%E7%BB%8F%E5%85%B8%E7%89%88/id6744975223'
  },
  {
    id: 'one-fill',
    name: { en: 'One Fill', zh: 'One Fill' },
    tagline: {
      en: 'Fill every cell in one stroke — simple line puzzles for any moment.',
      zh: '一笔走完每个格子 —— 任何时刻都能上手的简单线条解谜。'
    },
    category: { en: 'Casual · Puzzle', zh: '休闲 · 解谜' },
    icon: 'assets/games/one-fill.png',
    iconGradient: 'linear-gradient(135deg, #f4c4c4, #d76a6a)',
    appStoreUrl: 'https://apps.apple.com/us/app/one-fill/id6744869927'
  },
  {
    id: 'triple-match-joy',
    name: { en: 'Triple Match Joy', zh: 'Triple Match Joy' },
    tagline: {
      en: '3D match-three with charming everyday objects.',
      zh: '俏皮日常物件的 3D 三消，越玩越上瘾。'
    },
    category: { en: '3D Match', zh: '3D 消除' },
    icon: 'assets/games/triple-match-joy.png',
    iconGradient: 'linear-gradient(135deg, #d4a8f8, #8b5fbf)',
    appStoreUrl: 'https://apps.apple.com/us/app/triple-match-joy/id6504737828'
  },
  {
    id: 'archery-pro',
    name: { en: 'Archery Pro', zh: 'Archery Pro - Bow & Arrow' },
    tagline: {
      en: 'Bow & arrow precision archery, calm and satisfying.',
      zh: '一弓一箭，宁静而过瘾的精准射艺。'
    },
    category: { en: 'Sports · Casual', zh: '运动 · 休闲' },
    icon: 'assets/games/archery-pro.png',
    iconGradient: 'linear-gradient(135deg, #a8d4f8, #4e88c8)',
    appStoreUrl: 'https://apps.apple.com/us/app/archery-pro-bow-arrow/id1450578727'
  },
  {
    id: 'finger-dunk',
    name: { en: 'Finger Dunk', zh: 'Finger Dunk' },
    tagline: {
      en: 'Flappy ball, one tap, lots of dunks.',
      zh: '一指就能扣篮，越扣越爽。'
    },
    category: { en: 'Arcade', zh: '街机' },
    icon: 'assets/games/finger-dunk.png',
    iconGradient: 'linear-gradient(135deg, #f8d4a8, #d68a3a)',
    appStoreUrl: 'https://apps.apple.com/us/app/finger-dunk/id1449794229'
  }
];
