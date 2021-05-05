export const sanitize = (str: string): string => {
  if (str.match(/^https?:\/\//)) {
    return str;
  }
  return "";
};
