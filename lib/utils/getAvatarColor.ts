import { AVATAR_COLORS } from "@/app/types/avatarColors";

export const getAvatarColor = (name: string) => {
  const color = AVATAR_COLORS.find((color) => color.name === name);
  return color ? color.value : "bg-blue-500";
};
