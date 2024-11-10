import { IMessage } from "./message"

export interface IRooms{
    id: number
    room: string
}

export interface IRoom{
    id: number
    room: string
    messages: IMessage[]
}