import { useCallback, useEffect, useState } from "react"
import { IRooms } from "../interface/rooms";
import { getRoom } from "../services/rooms";
import { useStore } from "../../context/useStore";

type Props = {
  roomId: number
}

export default function Chat({roomId}: Props) {
  const [room, setRoom] = useState<IRooms>();

  const {auth} = useStore()

  const getRoomData = useCallback(async()=>{
    try {
      const {data} = await getRoom(roomId, auth?.token ?? '')
      setRoom(data)
    } catch (error) {
      if(error instanceof Error)
      console.error(error)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  useEffect(()=>{
    getRoomData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId])

  return (
    <article className="bg-neutral-800 w-[85%] h-full rounded-r-sm text-white">
      <div className="w-full flex justify-center items-center p-2">
        <h3 className="uppercase font-semibold">{room?.room}</h3>
      </div>
      <div className=" w-full h-[400px] bg-neutral-700 overflow-auto"></div>
      <form className="w-full justify-center items-center flex gap-2 p-2">
        <input type="text" placeholder="Write your message" className="outline-none text-xs w-[70%] rounded-sm border-0 p-2 transition-all focus:border-gray-400 focus:border-2 text-stone-900"/>
        <button className="text-xs uppercase bg-blue-700 p-2 transition-all hover:bg-blue-400 rounded-sm">Send</button>
      </form>
    </article>
  )
}
