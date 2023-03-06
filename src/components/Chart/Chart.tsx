import { FC, useState } from 'react';
import { providers } from 'data/providers';
import { ParamBunny, ParamScaleway } from 'types/types';
import { chartInputSize, minPrice } from 'utils/utils';
import {
  getBackblazePrice,
  getBunnyPrice,
  getScalewayPrice,
  getVultrPrice
} from 'utils/providersPrices';
import useResize from 'hooks/useResize';
import './Chart.css';

interface ChartProps {
  storage: number;
  transfer: number;
}

const Chart: FC<ChartProps> = ({ storage, transfer }) => {
  const [paramBunny, setParamBunny] = useState<ParamBunny>('HDD');
  const [paramScaleway, setParamScaleway] = useState<ParamScaleway>('Multi');

  const windowWidth = useResize();

  const backblazePrice = getBackblazePrice(storage, transfer);
  const bunnyPrice = getBunnyPrice(storage, transfer, paramBunny);
  const scalewayPrice = getScalewayPrice(storage, transfer, paramScaleway);
  const vultrPrice = getVultrPrice(storage, transfer);

  let prices: number[] = [backblazePrice, bunnyPrice, scalewayPrice, vultrPrice];

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
                      paramBunny === param || paramScaleway === param ? 'active' : ''
                    }`}
                    onClick={() => {
                      (param === 'HDD' || param === 'SSD') && setParamBunny(param);
                      (param === 'Multi' || param === 'Single') && setParamScaleway(param);
                    }}
                    key={param}>
                    {param}
                  </span>
                ))}
              </p>
            )}
          </div>

          <img src={provider.logo} alt={provider.name} className="chart__logo" />

          <input
            type="range"
            className='chart__input'
            style={{
              backgroundColor: `${minPrice(prices[i], prices) ? provider.color : '#636363'}`,
              ...(windowWidth > 768
                ? { width: `${chartInputSize(prices[i], prices)}%` }
                : { height: `${chartInputSize(prices[i], prices)}%` })
            }}
            max={Math.max(...prices)}
          />

          <p className="chart__price">{Math.trunc(prices[i] * 100) / 100}$</p>
        </div>
      ))}
    </div>
  );
};

export default Chart;
