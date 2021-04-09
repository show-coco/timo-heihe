import React from "react";
import { Heading } from "../components/heading/heading";
import { ReceivedAppsCard } from "../components/received-applications-card";
import { Template } from "../components/template/app/template";
import {
  ReceivedApplyingDocument,
  ReceivedApplyingQuery,
  useAcceptApplicationMutation,
  useReceivedApplyingQuery,
  useRejectApplicationMutation,
} from "../generated/types";
import { Meta } from "../components/head";
export default function ReceivedApplyingPage() {
  const { data, loading } = useReceivedApplyingQuery();
  const [reject] = useRejectApplicationMutation();
  const [accept] = useAcceptApplicationMutation();

  const onClickReject = (userId: number, roomId: number) => {
    reject({
      variables: {
        userId,
        roomId,
      },
      update: (cache) => {
        const existingApps = cache.readQuery<ReceivedApplyingQuery>({
          query: ReceivedApplyingDocument,
        });

        const newMyRooms = existingApps?.myRooms.map((myRoom) => ({
          ...myRoom,
          applyingUsers: myRoom.applyingUsers?.filter(
            (user) => user.user?.id !== userId || myRoom.id !== roomId
          ),
        }));

        console.log("newMyRooms", newMyRooms);

        cache.writeQuery<ReceivedApplyingQuery>({
          query: ReceivedApplyingDocument,
          data: { myRooms: newMyRooms || [] },
        });
      },
    });
  };

  const onClickAccept = (userId: number, roomId: number) => {
    accept({
      variables: {
        userId,
        roomId,
      },
    });
  };

  const isExists = data?.myRooms.some((myRoom) => myRoom.applyingUsers?.length);

  return (
    <Template className="p-10">
      <Meta
        title={"受け取った申請 | CloudCircle"}
        image={`https://ogp-mu.vercel.app/受け取った申請`}
      />
      <div className="w-3/5 mx-auto">
        <Heading as="h1Big" className="mb-8 text-center">
          受け取った申請
        </Heading>

        {/* TODO */}
        {loading ? (
          <p>Loading...</p>
        ) : isExists ? (
          data?.myRooms.map((myRoom) =>
            myRoom.applyingUsers?.length ? (
              <div className="mb-8">
                <Heading as="h2" className="mb-5">
                  {myRoom.name}
                </Heading>

                {myRoom.applyingUsers.map((applyingUser) => (
                  <ReceivedAppsCard
                    {...applyingUser.user}
                    key={applyingUser.user?.id}
                    onReject={() =>
                      onClickReject(applyingUser.user?.id, myRoom.id || 0)
                    }
                    onAccept={() => {
                      onClickAccept(applyingUser.user?.id, myRoom.id || 0);
                    }}
                  />
                ))}
              </div>
            ) : null
          )
        ) : (
          <p className="text-center">受け取った申請はありません</p>
        )}
      </div>
    </Template>
  );
}
