export const getNameInitials = (name: string): string => {
  return name
    .split(" ")
    .map((value) => value[0])
    .join("");
};
