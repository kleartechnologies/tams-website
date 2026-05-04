const mapping: { keywords: string[]; emoji: string }[] = [
  { keywords: ["makkah", "madinah", "umrah"], emoji: "🕌" },
  { keywords: ["bali", "jakarta", "indonesia"], emoji: "🇮🇩" },
  { keywords: ["tokyo", "osaka", "japan"], emoji: "🇯🇵" },
  { keywords: ["kuala lumpur", "malaysia"], emoji: "🇲🇾" },
  { keywords: ["bangkok", "thailand"], emoji: "🇹🇭" },
  { keywords: ["istanbul", "turkey"], emoji: "🇹🇷" },
  { keywords: ["dubai", "abu dhabi", "uae"], emoji: "🇦🇪" },
  { keywords: ["seoul", "busan", "korea"], emoji: "🇰🇷" },
  { keywords: ["paris", "france"], emoji: "🇫🇷" },
  { keywords: ["london", "uk", "england"], emoji: "🇬🇧" },
];

export function getDestinationEmoji(destination: string): string {
  const lower = destination.toLowerCase();
  for (const { keywords, emoji } of mapping) {
    if (keywords.some((kw) => lower.includes(kw))) return emoji;
  }
  return "🌍";
}
