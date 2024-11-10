import { useStore } from "../../context/useStore"
import { useRooms } from "../hooks/useRooms"

export default function Menu() {
    const {rooms} = useRooms()
    const {logout} = useStore()
    const styleItem ='text-sm font-semibold uppercase text-white p-2 cursor-pointer transition-all hover:bg-blue-700 w-full text-center'
  return (
    <ul className="w-[15%] flex flex-col justify-center items-center bg-gray-950 h-full rounded-l-sm">
        {rooms.map((el)=> <li className={styleItem} key={el.id}>{el.room}</li>)}
        <li className={styleItem} onClick={()=> logout()}>Logout</li>
    </ul>
  )
}
