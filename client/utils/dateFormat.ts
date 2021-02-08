export const YEAR_MANTH_DAY_SLASH = "yyyy/MM/dd";
export const YEAR_MONTH_DAY_HOUR_MIN = "yyyy/MM/dd/HH:mm";

export const dateFormatter = (date: Date, format: string) => {
  format = format.replace(/yyyy/g, date.getFullYear().toString());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
  return format;
};
