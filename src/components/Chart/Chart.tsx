import { FC, useMemo, useState } from "react";
import { providers } from "data/providers";
import { ParamBunny, ParamScaleway } from "types/types";
import { chartInputSize, minPrice, setPriceByGB } from "utils/utils";
import useResize from "hooks/useResize";
import "./Chart.css";

interface ChartProps {
  storage: number;
  transfer: number;
}

const Chart: FC<ChartProps> = ({ storage, transfer }) => {
  const [paramBunny, setParamBunny] = useState<ParamBunny>("HDD");
  const [paramScaleway, setParamScaleway] = useState<ParamScaleway>("Multi");

  const windowWidth = useResize();

  const backblazePrice = useMemo(() => {
    const price = 0.005 * storage + 0.01 * transfer;
    return price < 7 ? 7 : price;
  }, [storage, transfer]);

  const bunnyPrice = useMemo(() => {
    const typePrice = paramBunny === "HDD" ? 0.01 : 0.02;
    const price = typePrice * storage + 0.01 * transfer;
    return price > 10 ? 10 : price;
  }, [storage, transfer, paramBunny]);

  const scalewayPrice = useMemo(() => {
    const typePrice = paramScaleway === "Multi" ? 0.06 : 0.03;
    return setPriceByGB(storage) * typePrice + setPriceByGB(transfer) * 0.02;
  }, [storage, transfer, paramScaleway]);

  const vultrPrice = useMemo(() => {
    let price = (storage + transfer) * 0.01;
    return price < 5 ? 5 : price;
  }, [storage, transfer]);

  let prices: number[] = [
    backblazePrice,
    bunnyPrice,
    scalewayPrice,
    vultrPrice,
  ];

  return (
    <div className="chart">
      {providers.map((provider, i) => (
        <div className="chart__item" key={i}>
          <div className="chart__dataContainer">
            <p>{provider.name}</p>

            {provider.params && (
              <p className="chart__params">
                {provider.params.map((param) => (
                  <span
                    className={`chat__param ${
                      paramBunny === param || paramScaleway === param
                        ? "active"
                        : ""
                    }`}
                    onClick={() => {
                      (param === "HDD" || param === "SSD") &&
                        setParamBunny(param);
                      (param === "Multi" || param === "Single") &&
                        setParamScaleway(param);
                    }}
                    key={param}
                  >
                    {param}
                  </span>
                ))}
              </p>
            )}
          </div>
          
          <img src={provider.logo} alt={provider.name} className='chart__logo'/>

          <input
            type="range"
            className={`chart__input ${
              minPrice(prices[i], prices) ? "min" : ""
            }`}
            style={
              windowWidth > 768
                ? { width: `${chartInputSize(prices[i], prices)}%` }
                : { height: `${chartInputSize(prices[i], prices)}%` }
            }
            max={Math.max(...prices)}
          />

          <p className="chart__price">{Math.trunc(prices[i] * 100) / 100}$</p>
        </div>
      ))}
    </div>
  );
};

export default Chart;
