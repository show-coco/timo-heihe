import React from "react";

type Props = {
  id: number;
  name: string;
  selectedItemIds: number[];
  isSelected: boolean;
  setIsSelected: React.Dispatch<React.SetStateAction<number[]>>;
};

const selectedStyle =
  "px-5 py-1 mb-3 mr-5 text-center text-white bg-purple-400 rounded-sm whitespace-nowrap";
const unselectedStyle =
  "px-5 py-1 mb-3 mr-5 text-center text-purple-400 border-purple-400 border rounded-sm whitespace-nowrap";

export const OperationTag: React.FC<Props> = ({
  id,
  name,
  selectedItemIds,
  isSelected,
  setIsSelected,
}: Props) => {
  console.log(selectedItemIds);

  const style = isSelected ? selectedStyle : unselectedStyle;
  const onClick = (id: number) => {
    if (selectedItemIds.includes(id)) {
      const newSelectedItemIds = selectedItemIds.filter(
        (selectedId) => selectedId !== id
      );
      setIsSelected(newSelectedItemIds);
    } else {
      setIsSelected([id, ...selectedItemIds]);
    }
  };

  return (
    <button className={style} key={id} onClick={() => onClick(id)}>
      {name}
    </button>
  );
};
