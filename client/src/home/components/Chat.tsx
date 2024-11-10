import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { IRoom } from "../interface/rooms";
import { getRoom } from "../services/rooms";
import { useStore } from "../../context/useStore";
import Message from "./Message";
import { io, Socket } from "socket.io-client";
import { apiUrl } from "../../config/api";
import "../../App.css";

type Props = {
  roomId: number;
};

export default function Chat({ roomId }: Props) {
  const [room, setRoom] = useState<IRoom>();
  const [message, setMessage] = useState<string>("");
  const [socket, setSocket] = useState<Socket | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { auth } = useStore();

  const scrollContainer = () => {
    setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.scrollTo({
          top: containerRef.current.scrollHeight,
          behavior: "smooth", // Animación suave
        });
      }
    }, 300);
  };

  const getRoomData = useCallback(async () => {
    try {
      const { data } = await getRoom(roomId, auth?.token ?? "");
      setRoom(data);
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  useEffect(() => {
    const socketInstance = io(apiUrl, {
      transports: ["websocket"],
      extraHeaders: {
        authorization: `Bearer ${auth?.token}`,
      },
    });

    setSocket(socketInstance);

    //Connnect
    socketInstance.on("connect", () => {
      getRoomData();
      scrollContainer();
    });

    //Listen
    socketInstance.on("messageServer", () => {
      getRoomData();
      scrollContainer();
    });

    // Disconnect
    return () => {
      socketInstance.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  const handleSendMessage = () => {
    if (socket && message.trim() !== "") {
      socket.emit("message", { roomId, message, userId: auth?.userId });

      setMessage("");
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    handleSendMessage();
    getRoomData();
    scrollContainer();
  };

  return (
    <article className=" w-[85%] h-full bg-white rounded-r-sm border-l">
      <div className="w-full flex justify-center items-center p-2">
        <h3 className="uppercase font-semibold text-stone-900">{room?.room}</h3>
      </div>
      <div
        className=" w-full h-[85%] bg-neutral-100 overflow-auto p-2 new-scroll transition-all"
        ref={containerRef}
      >
        {room?.messages.length ? (
          room?.messages.map((el) => (
            <Message
              key={el.id}
              message={el.message}
              create_at={el.createAt}
              userId={el.userId}
            />
          ))
        ) : (
          <p className="text-center uppercase text-sm font-semibold">
            Chat is empty
          </p>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full justify-center items-center flex gap-2 p-2 bg-white"
      >
        <input
          type="text"
          placeholder="Write your message"
          className="outline-none text-xs w-[70%] rounded-sm border border-stone-300 p-2 transition-all focus:border-blue-400 focus:border-2 text-stone-900"
          value={message}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            setMessage(event.target.value)
          }
        />
        <button className="text-xs uppercase bg-blue-700 text-white p-2 transition-all hover:bg-blue-400 rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-4"
          >
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </form>
    </article>
  );
}
