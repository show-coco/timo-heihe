import { useEffect, useState } from "react";

type Props = {
  initialValues?: number[];
  max?: number;
  min?: number;
};

export const CHECK_BOX_ERRORS = {
  MIN: {
    code: 1,
    message: "個以上選択してください",
  },
  MAX: {
    code: 2,
    message: "個以下で選択してください",
  },
};

const MIN_MESSAGE = "個以上選択してください";
const MAX_MESSAGE = "個以下で選択してください";

export type CheckBoxErrorType = typeof CHECK_BOX_ERRORS[keyof typeof CHECK_BOX_ERRORS];

export const useCheckbox = ({ initialValues, max, min }: Props) => {
  const [values, setValues] = useState<number[]>([]);
  const [errors, setErrors] = useState<CheckBoxErrorType[]>([]);
  const [changedCount, setChangedCount] = useState(0);

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);

  useEffect(() => {
    if (changedCount < 2) {
      setChangedCount(2);
    } else {
      valid();
    }
  }, [values]);

  const onChange = (selectedId: number) => {
    if (values.includes(selectedId)) {
      const newValues = values.filter((id) => selectedId !== id);
      setValues(newValues);
    } else {
      setValues([...values, selectedId]);
    }
  };

  const valid = () => {
    let newErrors: CheckBoxErrorType[] = [];
    if (min && values.length < min) {
      CHECK_BOX_ERRORS.MIN.message = min + MIN_MESSAGE;
      newErrors.push(CHECK_BOX_ERRORS.MIN);
    }

    if (max && values.length < max) {
      CHECK_BOX_ERRORS.MAX.message = max + MAX_MESSAGE;
      newErrors.push(CHECK_BOX_ERRORS.MAX);
    }

    setErrors(newErrors);
  };

  return {
    values,
    errors,
    onChange,
  };
};
