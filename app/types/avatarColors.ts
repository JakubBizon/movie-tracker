export const AVATAR_COLORS = [
  { name: "blue", value: "bg-blue-500" },
  { name: "purple", value: "bg-purple-500" },
  { name: "green", value: "bg-emerald-500" },
  { name: "orange", value: "bg-orange-500" },
  { name: "pink", value: "bg-pink-500" },
  { name: "red", value: "bg-red-500" },
] as const;

export type AvatarColorName = (typeof AVATAR_COLORS)[number]["name"];
