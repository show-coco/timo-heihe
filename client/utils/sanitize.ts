export const checkURL = (str: string) => {
  if (str.match(/^https?:\/\//)) {
    return str;
  }
  return "";
};
