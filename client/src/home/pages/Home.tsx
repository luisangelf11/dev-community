import { useState } from "react";
import Chat from "../components/Chat";
import Menu from "../components/Menu";

export default function Home() {
  const [room, setRoom] = useState<number>(3)
  const openRoom = (id: number)=> setRoom(id)
  return (
    <section className="flex justify-center items-center w-full h-screen bg-neutral-600">
      <article className="w-[70%] h-[500px] flex justify-center items-center shadow-xl">
        <Menu openRoom={openRoom} />
        <Chat roomId={room}/>
      </article>
    </section>
  );
}
