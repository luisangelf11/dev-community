import { useStore } from "../../context/useStore";
import { useRooms } from "../hooks/useRooms";
import ItemMenu from "./ItemMenu";

type Props = {
  openRoom: (id: number) => void;
};

export default function Menu({ openRoom }: Props) {
  const { rooms } = useRooms();
  const { logout } = useStore();
  const styleItem =
    "text-sm font-bold p-2 cursor-pointer transition-all hover:bg-blue-500 w-full text-center flex justify-start items-center gap-2 border-b";
  return (
    <ul className="w-[15%] flex flex-col justify-center items-center text-gray-800 h-full rounded-l-sm">
      <h2 className="text-2xl uppercase font-bold text-slate-800">My Chats</h2>
      {rooms.map((el) => (
        <ItemMenu
          key={el.id}
          name={el.room}
          open={openRoom}
          id={el.id}
          styleItem={styleItem}
        />
      ))}
      <li className={styleItem + `uppercase`} onClick={() => logout()}>
        <div className="w-[30px] h-[30px] bg-stone-700 flex  justify-center items-center rounded-full text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
            />
          </svg>
        </div>
        <span>Logout</span>
      </li>
    </ul>
  );
}
