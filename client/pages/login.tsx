import React from "react";
import { Button } from "../components/button/button";
import { Card } from "../components/card/card";

function Login() {
  return (
    <div className="flex flex-col lg:flex-row  h-screen w-full">
      <div className="flex flex-col items-center items-center w-full p-20">
        <div className="mb-16 w-full">
          <h1 className="mb-5 text-center text-2xl">Timo Heiheとは</h1>
          <p>
            Timo Heiheとは、エンジニアのためのアウトプットプラットフォームです。
            Timo Heiheには、様々なアウトプットのためのサービスがあります。
          </p>
        </div>

        <div className="w-full">
          <h2 className="mb-5 text-xl">Hirosaa</h2>
          <p>
            Hriosaaはチーム開発のためのサービスです。チームを募集し、研究・開発を
            行いましょう。
          </p>
        </div>
      </div>

      <div className="flex justify-center items-center w-full bg-orange-200">
        <Card className="text-center">
          <h2 className="text-4xl my-6">Log in</h2>
          <div className="w-3/4 mx-auto">
            <p className="my-7 text-left">
              Googleアカウントを使用して、下のボタンからログイン、新規登録を行う事ができます。
              <a href="#" className="underline">
                利用規約
              </a>
              、
              <a href="#" className="underline">
                プライバシーポリシー
              </a>
              に同意した上でログインしてください。
            </p>
          </div>
          <a href="http://localhost:8080/google">
            <Button className="my-4">Log in with Google</Button>
          </a>
        </Card>
      </div>
    </div>
  );
}

export default Login;
