import React from "react";
import { Card } from "./card";
import { SkillPochiSet } from "../skill/skill-pochi-set";
import {
  AvatarWithName,
  AvatarWithNameProps,
} from "../avatar/avatar-with-name";
import { SkillModel, RoomCardFragment } from "../../generated/types";
import { dateFormatter, YEAR_MANTH_DAY_SLASH } from "../../utils/dateFormat";
import Link from "next/link";
import { FirstParagraphDisplayer } from "../parser/first-paragraph-displayer";

export type RoomCardProps = RoomCardFragment & {
  className?: string;
};

const convertToSKillsArray = (
  skills: Pick<SkillModel, "name" | "id">[] | null | undefined
) => {
  if (skills == undefined || skills == null) return [""];
  return skills?.map((skill) => skill.name);
};

export const RoomCard: React.FC<RoomCardProps> = ({
  title,
  slug,
  owner,
  description,
  skills,
  createdAt,
  className,
}: RoomCardProps) => {
  return (
    <div>
      <Link href={`/room/[slug]`} as={`/room/${slug}`}>
        <div>
          <Card
            className={`p-5 cursor-pointer hover:shadow-md duration-200 ${className}`}
            tabIndex={0}
            role="button"
          >
            <div className="flex flex-col md:items-center md:flex-row">
              <h3 className="flex-1">{title}</h3>

              <span className=" w-min">
                <AvatarWithName
                  src={owner.avatar || ""}
                  name={owner.name}
                  size="small"
                  className="mr-4"
                  userId={owner.userId}
                />
              </span>
            </div>

            <FirstParagraphDisplayer className="pt-4 pb-6" text={description} />

            <div className="flex items-end">
              <SkillPochiSet
                skills={convertToSKillsArray(skills)}
                className="flex-row flex-1"
              />

              <span>{createdAt}</span>
            </div>
          </Card>
        </div>
      </Link>
    </div>
  );
};
