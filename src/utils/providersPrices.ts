import { ParamBunny, ParamScaleway } from "types/types";

export const getBackblazePrice = (storage: number, transfer: number) => {
  const price = 0.005 * storage + 0.01 * transfer;
  return price < 7 ? 7 : price;
}

export const getBunnyPrice = (storage: number, transfer: number, paramBunny: ParamBunny) => {
  const typePrice = paramBunny === "HDD" ? 0.01 : 0.02;
  const price = typePrice * storage + 0.01 * transfer;
  return price > 10 ? 10 : price;
};

const setPriceByGB = (value: number) => (value > 75 ? value - 75 : 0);

export const getScalewayPrice = (storage: number, transfer: number, paramScaleway: ParamScaleway) => {
  const typePrice = paramScaleway === "Multi" ? 0.06 : 0.03;
  return setPriceByGB(storage) * typePrice + setPriceByGB(transfer) * 0.02;
};

export const getVultrPrice = (storage: number, transfer: number) => {
  let price = (storage + transfer) * 0.01;
  return price < 5 ? 5 : price;
};
