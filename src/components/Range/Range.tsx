import { ChangeEventHandler, Dispatch, FC, SetStateAction } from "react";
import "./Range.css";

interface RangeProps {
  type: "Storage" | "Transfer";
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
}

const Range: FC<RangeProps> = ({ type, value, setValue }) => {
  const onChangeSetValue: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    setValue(Number(target.value));
  };

  return (
    <div className="range">
      <div className="range__label">
        <p>{type}</p>
        <p>{value} GB</p>
      </div>
      <input
        type="range"
        defaultValue={value}
        min={0}
        max={1000}
        step={1}
        onChange={onChangeSetValue}
        className='range__input'
      />
    </div>
  );
};

export default Range;
