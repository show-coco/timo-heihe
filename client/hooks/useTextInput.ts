import React, { useCallback, useEffect, useState } from "react";
import { TextInputProps } from "../components/text-input/text-input";

export const REGEXES = {
  HALF_SIZE_NUMBER: "^[0-9a-z-_]*$",
  URL: "^(https?://)",
} as const;

type RegexType = typeof REGEXES[keyof typeof REGEXES];

type Props = {
  initialValue?: string;
  regex?: RegexType;
  required?: boolean;
  max?: number;
  min?: number;
  placeholder?: string;
  name?: string;
};

const isValidChars = (text: string, regex: RegexType) => {
  return text.match(regex);
};

export const TEXT_INPUT_ERRORS = {
  HALF_SIZE_NUMBER: {
    code: 1,
    message: "半角英数字(小文字)または「-」「_」で入力してください",
  },
  REQUIRED: {
    code: 2,
    message: "必須項目です",
  },
  MIN: {
    code: 3,
    message: "文字以上入力してください",
  },
  MAX: {
    code: 4,
    message: "文字以下で入力してください",
  },
  DEPLICATED: {
    code: 5,
    message: "IDが既に使用されています",
  },
  URL: {
    code: 6,
    message: "httpsまたはhttpで始まるURLを入力してください",
  },
};

const MIN_MESSAGE = "文字以上入力してください";
const MAX_MESSAGE = "文字以下で入力してください";

export type TextInputErrorType = typeof TEXT_INPUT_ERRORS[keyof typeof TEXT_INPUT_ERRORS];

export type UseTextInput = TextInputProps & {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setErrors: React.Dispatch<React.SetStateAction<TextInputErrorType[]>>;
  valid: () => void;
};

export const useTextInput = ({
  initialValue = "",
  regex,
  required = false,
  min,
  max,
  ...props
}: Props): UseTextInput => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<TextInputErrorType[]>([]);
  // const [changedCount, setChangedCount] = useState(0);

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    // if (changedCount < 2) {
    //   setChangedCount(2);
    // } else {
    valid();
    // }
  }, [value]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const valid = useCallback(() => {
    let newErrors: TextInputErrorType[] = [];
    if (regex && !isValidChars(value, regex)) {
      switch (regex) {
        case REGEXES.HALF_SIZE_NUMBER:
          newErrors.push(TEXT_INPUT_ERRORS.HALF_SIZE_NUMBER);
          break;
        case REGEXES.URL:
          newErrors.push(TEXT_INPUT_ERRORS.URL);
          break;
      }
    }

    if (min && value.length < min) {
      TEXT_INPUT_ERRORS.MIN.message = min + MIN_MESSAGE;
      newErrors.push(TEXT_INPUT_ERRORS.MIN);
    }

    if (max && value.length > max) {
      TEXT_INPUT_ERRORS.MAX.message = max + MAX_MESSAGE;
      newErrors.push(TEXT_INPUT_ERRORS.MAX);
    }

    if (required && value === "") {
      newErrors.push(TEXT_INPUT_ERRORS.REQUIRED);
    }
    setErrors(newErrors);
  }, [value]);

  return {
    errors,
    value,
    required,
    ...props,
    onChange,
    setValue,
    setErrors,
    valid,
  };
};
