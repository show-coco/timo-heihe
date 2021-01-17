import React from "react";
import { Button } from "../components/button/button";

export default function Home() {
  return (
    <section className="h-screen w-4/5 max-w-5xl mx-auto flex items-center justify-center flex-col">
      <h1 className="mb-4 text-green-500 text-3xl">サンプル</h1>
      <p className="mb-2 text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        blanditiis consequatur eius hic ipsam nostrum omnis optio! Doloribus
        quaerat quis ratione? At, maiores voluptas? Eveniet odio omnis
        repellendus sapiente voluptatibus.
      </p>
      <Button>Button</Button>
    </section>
  );
}
