import React from "react";
import { CategoryModel } from "../../generated/types";
import { Category } from "./category";

type CategoryType = {
  id: number;
  name: string;
};

type CategorySetProps = {
  categories: CategoryType[];
  className?: string;
};

export const convertToCategoryArray = (
  categories: Pick<CategoryModel, "id" | "name">[]
) => {
  return categories.map((category) => ({
    id: category.id || 0,
    name: category.name,
  }));
};

export const CategorySet: React.FC<CategorySetProps> = ({
  categories,
  className,
}: CategorySetProps) => {
  return (
    <div className={`flex flex-wrap ${className}`}>
      {categories.map((category) => (
        <Category key={category.id} className="mr-3">
          {category.name}
        </Category>
      ))}
    </div>
  );
};
