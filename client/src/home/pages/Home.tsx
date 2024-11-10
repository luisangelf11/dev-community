import { useState } from "react";
import Chat from "../components/Chat";
import Menu from "../components/Menu";

export default function Home() {
  const [room, setRoom] = useState<number>(3)
  const openRoom = (id: number)=> setRoom(id)
  return (
    <section className="flex justify-center items-center w-full h-screen">
      <article className="w-full h-full  flex justify-center items-center">
        <Menu openRoom={openRoom} />
        <Chat roomId={room}/>
      </article>
    </section>
  );
}
