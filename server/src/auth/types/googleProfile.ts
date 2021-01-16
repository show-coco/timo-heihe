export type GooglePrfile = {
  id: string;
  name: { givenName: string; familyName: string };
  emails: { value: string }[];
  photos: { value: string }[];
};
