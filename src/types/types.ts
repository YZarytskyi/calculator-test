export type ParamBunny = "HDD" | "SSD";

export type ParamScaleway = "Multi" | "Single";

export interface IProvider {
  name: "backblaze" | "bunny" | "scaleway" | "vultr";
  logo: string;
  params?: Array<"HDD" | "SSD" | "Multi" | "Single">;
  color: "red" | "orange" | "violet" | "blue";
}
