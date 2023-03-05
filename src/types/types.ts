export type ParamBunny = "HDD" | "SSD";

export type ParamScaleway = "Multi" | "Single";

export interface IProvider {
  name: "backblaze" | "bunny" | "scaleway" | "vultr";
  params?: Array<"HDD" | "SSD" | "Multi" | "Single">;
}
