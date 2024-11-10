import { useEffect, useState } from "react";
import { useStore } from "../../context/useStore";
import { IRooms } from "../interface/rooms";
import { getRooms } from "../services/rooms";

export const useRooms = () => {
  const { auth } = useStore();
  const [rooms, setRooms] = useState<IRooms[] | []>([]);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = async () => {
    try {
      const { data } = await getRooms(auth?.token ?? "");
      console.log(data);
      setRooms(data);
    } catch (error) {
      if (error instanceof Error) console.error(error);
    }
  };

  return { rooms };
};
