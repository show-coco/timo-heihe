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

export type RoomCardProps = {
  title: string;
  slug: string;
  owner: AvatarWithNameProps;
  description: string;
  languages: string[];
  createdAt: string;
  className?: string;
};

export const convertToTeamCardObjFromTeams = (
  queryObj: RoomCardFragment[]
): RoomCardProps[] => {
  return queryObj.map((team) => {
    return {
      ...team,
      id: team.id || 0,
      owner: {
        name: team.owner.name,
        src: team.owner.avatar || "",
        userId: team.owner.userId,
      },
      languages: convertToSKillsArray(team.skills),
      createdAt: dateFormatter(
        new Date(Date.parse(team.createdAt)),
        YEAR_MANTH_DAY_SLASH
      ),
    };
  });
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
  languages,
  createdAt,
  className,
}: RoomCardProps) => {
  return (
    <div>
      <Link
        href={`/room/[slug]?title=${title}`}
        as={`/room/${slug}?title=${title}`}
      >
        <div>
          <Card
            className={`p-5 cursor-pointer ${className}`}
            tabIndex={0}
            role="button"
          >
            <div className="flex flex-col md:items-center md:flex-row">
              <h3 className="flex-1">{title}</h3>

              <span>
                <AvatarWithName
                  src={owner.src}
                  name={owner.name}
                  size="small"
                  className="mr-4"
                  userId={owner.userId}
                />
              </span>
            </div>

            <FirstParagraphDisplayer className="pt-4 pb-6" text={description} />

            <div className="flex items-end">
              <SkillPochiSet skills={languages} className="flex-row flex-1" />

              <span>{createdAt}</span>
            </div>
          </Card>
        </div>
      </Link>
    </div>
  );
};
