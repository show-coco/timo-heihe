import React from "react";

type FileInputProps = React.ComponentPropsWithRef<"input"> & {
  onClick: () => void;
  // FIXME
  // eslint-disable-next-line no-unused-vars
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

// eslint-disable-next-line react/display-name
export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  ({ onClick, onChange }: FileInputProps, ref) => {
    return (
      <div className="overflow-hidden relative w-48 mt-4 mb-4">
        <button
          className="bg-blue-300 py-2 px-4 w-full inline-flex items-center rounded-sm"
          onClick={onClick}
        >
          <svg
            fill="#FFF"
            height="18"
            viewBox="0 0 24 24"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z" />
          </svg>
          <span className="ml-2 text-white font-bold text-sm">
            アイコンを選択する
          </span>
        </button>
        <input
          className="cursor-pointer absolute block opacity-0 pin-r pin-t"
          type="file"
          name="vacancyImageFiles"
          multiple
          ref={ref}
          onChange={onChange}
        />
      </div>
    );
  }
);
