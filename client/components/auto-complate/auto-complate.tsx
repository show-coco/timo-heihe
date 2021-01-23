import React, { BaseSyntheticEvent, useState } from "react";
import Autosuggest from "react-autosuggest";

export type ACSelectedData = {
  name: string;
  id: string;
};

type AutoComplateProps = {
  data: ACSelectedData[];
  placeholder?: string;
  selectedData: ACSelectedData[];
  // eslint-disable-next-line no-unused-vars
  setSelected: React.Dispatch<React.SetStateAction<ACSelectedData[]>>;
};

export const AutoComplate: React.FC<AutoComplateProps> = ({
  data,
  placeholder,
  selectedData,
  setSelected,
}: AutoComplateProps) => {
  const getSuggestions = (value: string): ACSelectedData[] => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : data.filter(
          (value) =>
            value.name.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<ACSelectedData[]>([]);

  const getSuggestionValue = (suggestion: ACSelectedData): string => {
    const { name } = suggestion;

    return name;
  };

  const renderSuggestion = (suggestion: ACSelectedData) => {
    return <div>{suggestion.name}</div>;
  };

  const onChange = (
    event: BaseSyntheticEvent,
    { newValue }: { newValue: string }
  ) => {
    if (event) {
      const newSelected = data.find((value) => value.name === newValue);
      setValue(newValue);

      if (newSelected) {
        const isAlreadySelected = Boolean(
          selectedData.filter((data) => data.name === newValue).length
        );
        const newSelectedData = selectedData.slice();

        if (!isAlreadySelected) {
          setSelected([...newSelectedData, newSelected]);
        }
      }
    }
  };

  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const suggestions: ACSelectedData[] = getSuggestions(value);
    setSuggestions(suggestions);
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const inputProps = {
    placeholder: placeholder,
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      onSuggestionSelected={() => setValue("")}
    />
  );
};
