import { useState } from "react";

export default function Home() {

  const [isOpen,setisOpen]= useState<boolean>(false)

  return (
    <div className="bg-red-500">Hava proje deneme</div>

  );
}
