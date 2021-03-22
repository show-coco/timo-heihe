import React from "react";
import { SkillTranslation } from "../skill/translation";
import { Checkbox } from "./checkbox";

type Item = {
  id: number;
  name: string;
};

type Props = {
  items: Item[];
  selectedItemIds: number[];
  className?: string;
  isSkill?: boolean;
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
};

export const CheckBoxOperaitons: React.FC<Props> = ({
  items,
  selectedItemIds,
  className,
  isSkill = false,
  setSelectedItems,
}: Props) => {
  const onChange = (id: number) => {
    const isExists = selectedItemIds.includes(id);

    if (isExists) {
      const removed = selectedItemIds.filter(
        (selectedItemId) => selectedItemId !== id
      );
      setSelectedItems(removed);
    } else {
      setSelectedItems([...selectedItemIds, id]);
    }
  };

  return (
    <div>
      {items.map((item) => (
        <Checkbox
          key={item.id}
          onChange={() => onChange(item.id)}
          checked={selectedItemIds.includes(item.id)}
          className={className}
        >
          {isSkill ? (
            <SkillTranslation>{item.name}</SkillTranslation>
          ) : (
            item.name
          )}
        </Checkbox>
      ))}
    </div>
  );
};
