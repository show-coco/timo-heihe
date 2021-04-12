import React, { useCallback, useEffect, useState } from "react";

export const REGEXES = {
  HALF_SIZE_NUMBER: "[^a-z0-9-_]",
} as const;

type RegexType = typeof REGEXES[keyof typeof REGEXES];

type Props = {
  initialValue?: string;
  regex?: RegexType;
  required?: boolean;
};

const includesInvalidChars = (text: string, regex: RegexType) =>
  new RegExp(regex).test(text);

export const FORM_ERRORS = {
  HALF_SIZE_NUMBER: {
    code: 1,
    message: "半角英数字を入力してください",
  },
  REQUIRED: {
    code: 2,
    message: "必須項目です",
  },
} as const;

export type FormErrorType = typeof FORM_ERRORS[keyof typeof FORM_ERRORS];

export const useTextInput = ({
  initialValue = "",
  regex,
  required = false,
}: Props) => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<FormErrorType[]>([]);

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    valid();
  }, [value]);

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(event.target.value);
  };

  const valid = useCallback(() => {
    let newErrors: FormErrorType[] = [];
    if (regex && includesInvalidChars(value, regex)) {
      switch (regex) {
        case REGEXES.HALF_SIZE_NUMBER:
          newErrors.push(FORM_ERRORS.HALF_SIZE_NUMBER);
          break;
      }
    }

    if (required && value === "") {
      newErrors.push(FORM_ERRORS.REQUIRED);
    }
    setErrors(newErrors);
  }, [value]);

  return {
    errors,
    value,
    onChange,
    valid,
  };
};
