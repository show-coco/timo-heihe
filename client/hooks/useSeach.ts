import React, { useState } from "react";

export const useSearch = () => {
  const [categories, setCategories] = useState<number[]>([]);
  const onChangeCategories = (
    event: React.FormEvent<HTMLInputElement>,
    id: number
  ) => {
    let newCategories = categories.slice();

    if (categories.includes(id)) {
      newCategories = categories.filter((value) => value !== id);
    } else {
      newCategories.push(id);
    }
    setCategories(newCategories);
  };
  return {
    onChangeCategories,
  };
};
