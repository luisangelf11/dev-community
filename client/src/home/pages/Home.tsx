import Chat from "../components/Chat";
import Menu from "../components/Menu";

export default function Home() {
  return (
    <section className="flex justify-center items-center w-full h-screen bg-neutral-800">
      <article className="w-[70%] h-[500px] flex justify-center items-center shadow-xl">
        <Menu />
        <Chat />
      </article>
    </section>
  );
}
