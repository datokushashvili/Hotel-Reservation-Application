import { room } from "./room";

export interface hotel {
    id: number;
    name: string;
    address: string;
    city: string;
    featuredImage: string;
    rooms: room[]
}