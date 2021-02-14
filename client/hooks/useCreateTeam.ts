// import { useRouter } from "next/router";
// import React from "react";
// import { useState } from "react";
// import { ACSelectedData } from "../components/auto-complate/auto-complate";
// import { CreateTeamInput, useCreateTeamMutation } from "../generated/types";
// import { useAuthContext } from "../providers/useAuthContext";
// import { useFileInput } from "./useFileInput";

// export const convertToCategoriesObj = (categories: number[]) => {
//   return categories.map((category) => ({
//     id: category,
//   }));
// };

// export const convertToSkillsObj = (skills: ACSelectedData[]) => {
//   return skills.map((skill) => ({
//     id: Number(skill.id),
//   }));
// };

// export const useCreateTeam = () => {
//   const router = useRouter();
//   const { id } = useAuthContext();
//   const [createTeam, { loading }] = useCreateTeamMutation();
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [recruitNumber, setRecruitNumber] = useState(0);
//   const [repositoryUrl, setRespositoryUrl] = useState("");
//   const [isRequired, setIsRequired] = useState("1");
//   const [selectedSkills, setSkills] = useState<ACSelectedData[]>([]);
//   const [categories, setCategories] = useState<number[]>([]);
//   const {
//     fileRef,
//     onClick: onClickFileInput,
//     onChange: onChangeFileInput,
//     imageUrl,
//   } = useFileInput();

//   const getVariables = (): CreateTeamInput => ({
//     title,
//     owner: {
//       id,
//     },
//     icon: imageUrl,
//     skills: convertToSkillsObj(selectedSkills),
//     description,
//     members: [
//       {
//         user: {
//           id,
//         },
//       },
//     ],
//     repositoryUrl,
//     recruitNumbers: recruitNumber,
//     isRequired: isRequired === "2",
//     categories: convertToCategoriesObj(categories),
//   });

//   console.log(getVariables());

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       const res = await createTeam({
//         variables: {
//           input: getVariables(),
//         },
//       });
//       router.push(`/team/${res.data?.createTeam.id}`);
//     } catch (e) {
//       console.log(e);
//     }
//   };

//   const onChangeCategories = (
//     event: React.FormEvent<HTMLInputElement>,
//     id: number
//   ) => {
//     let newCategories = categories.slice();

//     if (categories.includes(id)) {
//       newCategories = categories.filter((value) => value !== id);
//     } else {
//       newCategories.push(id);
//     }
//     setCategories(newCategories);
//   };

//   return {
//     setTitle,
//     setSkills,
//     setDescription,
//     onSubmit,
//     onClickFileInput,
//     onChangeFileInput,
//     setRecruitNumber,
//     setRespositoryUrl,
//     setIsRequired,
//     onChangeCategories,
//     selectedSkills,
//     recruitNumber,
//     fileRef,
//     imageUrl,
//     loading,
//   };
// };
