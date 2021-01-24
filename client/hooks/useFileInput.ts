import React, { useRef, useState } from "react";
import { storage } from "../firebase";
import loadImage from "blueimp-load-image";

export const useFileInput = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("/user.png");

  const onClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (fileRef && fileRef.current) fileRef.current.click();
  };

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const canvas = await loadImage(file, {
        maxWidth: 1200,
        canvas: true,
      });

      console.log(canvas.image);
      storage
        .ref(`image/${file.name}`)
        .put(file)
        .then(async (snapshot) => {
          const url = await snapshot.ref.getDownloadURL();
          setImageUrl(url);
        });

      // TODO: エラーハンドリング
      // https://firebase.google.com/docs/storage/web/upload-files?hl=ja#upload_from_a_blob_or_file
      // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, next, error, () =>
      //   complete(file)
      // );
    }
  };

  // const next = (snapshot: any) => {
  //   // 進行中のsnapshotを得る
  //   // アップロードの進行度を表示
  //   const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //   console.log(percent + "% done");
  //   console.log(snapshot);
  // };
  // const error = (error: any) => {
  //   // エラーハンドリング
  //   console.log(error);
  // };
  // const complete = (image: File) => {
  //   console.log(image);
  //   if (!image) return;

  //   // 完了後の処理
  //   // 画像表示のため、アップロードした画像のURLを取得
  //   storage
  //     .ref("images")
  //     .child(image.name)
  //     .getDownloadURL()
  //     .then((fireBaseUrl) => {
  //       setImageUrl(fireBaseUrl);
  //     });
  // };

  return {
    onClick,
    onChange,
    setImageUrl,
    fileRef,
    imageUrl,
  };
};
