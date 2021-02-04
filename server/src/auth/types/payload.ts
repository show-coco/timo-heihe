// Note: we choose a property name of sub to hold our userId value to be consistent with JWT standards
export type Payload = {
  name: string;
  sub: number;
};
