import React from "react" ;
import { Avatar } from "../avatar/avatar";
import { Heading } from "../heading/heading";

export const GitHubRepositoryCard: React.FC = () => {

    return (
        <div className="flex items-center min-w-min bg-white-100 rounded-md">
            <div className="flex flex-col space-y-4 ml-4 mb-2 mt-2">
                <div className="flex flex-col space-y-1">
                    <Heading as="h3" className="font-thin text-indigo-500">show-coco/react-practice</Heading>
                    <p className="font-thin text-xs">React練習用のリポジトリです</p>
                </div>
                
                <div className="flex flex-row space-x-2">
                    <div className="mt-1 rounded-full h-4 w-4 flex items-center bg-blue-400"></div>
                    <div>
                        <p className="font-medium text-x1">TypeScript</p>
                    </div>
                </div>
            </div>
        </div>
    )
}