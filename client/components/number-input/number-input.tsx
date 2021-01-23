import React from "react";

type NumberInputProps = {
  className?: string;
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};

const defaultStyle = "w-32 flex";

export const NumberInput: React.FC<NumberInputProps> = ({
  className,
  value,
  setValue,
}: NumberInputProps) => {
  return (
    <div className={`${defaultStyle} ${className}`}>
      <button
        data-action="decrement"
        className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        onClick={(e) => {
          e.preventDefault();
          setValue(value - 1);
        }}
      >
        <span className="m-auto text-2xl font-thin">−</span>
      </button>
      <input
        type="number"
        className="focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none border-gray-300"
        name="custom-input-number"
        value={value}
      ></input>
      <button
        data-action="increment"
        className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          setValue((value) => value + 1);
        }}
      >
        <span className="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  );
};
