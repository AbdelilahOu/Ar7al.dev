import { skillIcon } from "$lib/data/skills";

const assets = import.meta.glob<string>(["/static/icons/skills/*", "/static/logos/*"], {
  query: "?inline",
  import: "default",
  eager: true,
});

export const asset = (path?: string) => (path ? assets[`/static${path}`] : undefined);

export const iconFor = (skill: string) => asset(skillIcon(skill));

export const colors = {
  page: "#0a0a0a",
  line: "#2a2a28",
  ink: "#f5f3ee",
  inkSoft: "#a5a29a",
  inkMute: "#6e6c66",
};

export function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(": "), cut.lastIndexOf("; "));
  if (end > max / 2) return text.slice(0, end) + ".";
  return text.slice(0, cut.lastIndexOf(" ")) + "...";
}

export function titleSize(title: string) {
  if (title.length > 60) return 48;
  if (title.length > 36) return 56;
  return 64;
}
