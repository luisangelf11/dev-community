import { useStore } from "../../context/useStore";
import { useRooms } from "../hooks/useRooms";

type Props = {
  openRoom: (id: number) => void;
};

export default function Menu({ openRoom }: Props) {
  const { rooms } = useRooms();
  const { logout } = useStore();
  const styleItem =
    "text-sm font-semibold uppercase text-white p-2 cursor-pointer transition-all hover:bg-blue-700 w-full text-center flex justify-start items-center gap-2";
  return (
    <ul className="w-[15%] flex flex-col justify-center items-center bg-neutral-900 h-full rounded-l-sm">
      {rooms.map((el) => (
        <li className={styleItem} key={el.id} onClick={() => openRoom(el.id)}>
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
              d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
            />
          </svg>

          <span>{el.room}</span>
        </li>
      ))}
      <li className={styleItem} onClick={() => logout()}>
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

        <span>Logout</span>
      </li>
    </ul>
  );
}
