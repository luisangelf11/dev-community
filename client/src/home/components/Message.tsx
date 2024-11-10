import { getEasyTime, getEasyDate } from "easy-datetime-ya";
import { useEffect, useState } from "react";
import { IUser } from "../../interface/users";
import { getUser } from "../../services/users";
import { useStore } from "../../context/useStore";

type Props = {
  message: string;
  create_at: string;
  userId: number;
};

export default function Message({ message, create_at, userId }: Props) {
  const [user, setUser] = useState<IUser | null>(null);
  const { auth } = useStore();

  const getData = async () => {
    try {
      const { data } = await getUser(userId);
      setUser(data);
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className={`flex flex-col w-[80%]  rounded-md p-2 ${
        userId === auth?.userId ? "ml-auto" : "mr-auto"
      } mt-2`}
    >
      <div
        className={`${
          userId === auth?.userId ? "bg-blue-500" : "bg-stone-500"
        } text-white p-2 rounded-md w-auto`}
      >
        <span className="text-xs font-semibold uppercase">
          {userId === auth?.userId ? "Me" : user?.username}
        </span>
        <p className="text-sm">{message}</p>
      </div>
      <span className="text-xs font-semibold text-gray-400">
        {getEasyDate(new Date(create_at))} - {getEasyTime(new Date(create_at))}
      </span>
    </div>
  );
}
