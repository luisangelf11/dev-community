import { useStore } from "../../context/useStore"
import { useRooms } from "../hooks/useRooms"

type Props = {
    openRoom: (id: number)=> void
}

export default function Menu({openRoom}: Props) {
    const {rooms} = useRooms()
    const {logout} = useStore()
    const styleItem ='text-sm font-semibold uppercase text-white p-2 cursor-pointer transition-all hover:bg-blue-700 w-full text-center'
  return (
    <ul className="w-[15%] flex flex-col justify-center items-center bg-neutral-900 h-full rounded-l-sm">
        {rooms.map((el)=> <li className={styleItem} key={el.id} onClick={()=> openRoom(el.id)}>{el.room}</li>)}
        <li className={styleItem} onClick={()=> logout()}>Logout</li>
    </ul>
  )
}
