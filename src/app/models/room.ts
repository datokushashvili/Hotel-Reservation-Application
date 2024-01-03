export interface room {
    id: number;
    name: string;
    hotelId: number;
    pricePerNight: number;
    available: boolean;
    maximumGuests: number;
    roomTypeId: number;
    bookedDates: bookedDates[];
    images: roomImage[]
}

interface bookedDates{
    id: number;
    date: string;
    roomId: number
}
interface roomImage{
    id: number;
    source: string;
    roomId: number
}

export interface roomType {
    id: number;
    name: string
}

export interface bookedRoom {
    id: number;
    roomID: number;
    checkInDate: string;
    checkOutDate: string;
    totalPrice: number;
    isConfirmed: boolean;
    customerName: string;
    customerId: string;
    customerPhone: string
}
export interface bookRoomData {
    roomId: number,
    checkInDate: string,
    checkOutDate: string,
    customerName: string,
    customerPhone: number,
    isConfirmed: boolean,
    customerId: string
  }

export interface filteredRoom {
    priceFrom: number | null;
    priceTo: number | null;
    roomTypeId: number | null;
    checkIn: string | null;
    checkOut: string | null;
    guestsCount: number | null;
}

export interface filteredRoomType{
    roomTypeId: number | null
}
