import { IProvider } from "../types/types";

export const providers: IProvider[] = [
  {
    name: "backblaze",
  },
  {
    name: "bunny",
    params: ["HDD", "SSD"],
  },
  {
    name: "scaleway",
    params: ["Multi", "Single"],
  },
  {
    name: "vultr",
  },
];
