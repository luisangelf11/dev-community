import { useEffect, useState } from "react";
import { IRoom } from "../interface/rooms";
import { getRoom } from "../services/rooms";
import { useStore } from "../../context/useStore";
import { io } from "socket.io-client";
import { apiUrl } from "../../config/api";

type Props = {
  styleItem: string;
  id: number;
  open: (id: number) => void;
  name: string;
};

export default function ItemMenu({ styleItem, name, id, open }: Props) {
  const [room, setRoom] = useState<IRoom | null>(null);
  const { auth } = useStore();

  const getData = async () => {
    try {
      const { data } = await getRoom(id, auth?.token ?? "");
      setRoom(data);
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  useEffect(() => {
    getData();
    const socketInstance = io(apiUrl, {
      transports: ["websocket"],
      extraHeaders: {
        authorization: `Bearer ${auth?.token}`,
      },
    });

    //Listen
    socketInstance.on("messageServer", () => {
      getData();
    });

    // Disconnect
    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <li className={styleItem} onClick={() => open(id)}>
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
            d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-start items-start">
        <span className="text-xs uppercase">{name}</span>
        <span className="text-xs font-normal">
          {room?.messages.length
            ? `${room?.messages[room.messages.length - 1].message}`
            : "---"}
        </span>
      </div>
    </li>
  );
}
