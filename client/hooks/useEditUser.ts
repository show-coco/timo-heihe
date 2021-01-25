import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ACSelectedData } from "../components/auto-complate/auto-complate";
import { useEditUserPageQuery } from "../generated/types";
import { convertToACSelectedData } from "./useEditTeam";
import { useFileInput } from "./useFileInput";

export const useEditUser = () => {
  const router = useRouter();
  const id = router.query.id;
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [githubId, setGithubId] = useState("");
  const [twitterId, setTwitterId] = useState("");
  const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
  const {
    fileRef,
    onClick: onClickFileInput,
    onChange: onChangeFileInput,
    imageUrl,
    setImageUrl,
  } = useFileInput();

  const { data } = useEditUserPageQuery({
    variables: {
      id: id?.toString() || "",
    },
  });

  useEffect(() => {
    if (data) {
      const user = data.user;
      setUserName(user.name);
      setUserId(user.id);
      setIntroduction(user.introduction || "");
      setGithubId(user.githubId || "");
      setTwitterId(user.twitterId || "");
      setImageUrl(user.avatar || "");
      setSkills(convertToACSelectedData(user.skills || []));
    }
  }, [data, setImageUrl]);

  // const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     await updateTeam({
  //       variables: {
  //         input: getVariables(),
  //       },
  //     });
  //     router.push(`/team/${id}`);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return {
    formState: {
      userName,
      userId,
      introduction,
      githubId,
      twitterId,
      imageUrl,
      selectedSkills,
    },
    setter: {
      setSkills,
    },
    file: {
      fileRef,
      onClickFileInput,
      onChangeFileInput,
    },
    skills: data?.skills || [],
  };
};
