import React from "react";

type Props = {
    children: string;
}

export const Tag: React.FC<Props> = ({ children }: Props) => {
    return (
        <span className="mr-5 text-white bg-purple-400 rounded-sm px-7">{children}</span>
    );
};