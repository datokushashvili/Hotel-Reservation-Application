import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { hotel } from '../models/hotel';
import { bookRoomData, bookedRoom, filteredRoom, filteredRoomType, room, roomType } from '../models/room';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  hotelMainUrl = 'https://hotelbooking.webwide.ge/api/Hotels/'
  roomMainUrl = 'https://hotelbooking.webwide.ge/api/Rooms/'
  bookingMainUrl = 'https://hotelbooking.webwide.ge/api/Booking'
  filterUrl = 'https://hotelbooking.webwide.ge/api/Rooms/GetFiltered'

  headers = {
    'Content-Type': 'application/json'
  }


  constructor(private http: HttpClient) { }
  getHotels() {
    return this.http.get<hotel[]>(this.hotelMainUrl + 'GetAll')
  }

  getHotelById(id: number) {
    return this.http.get<hotel>(this.hotelMainUrl + 'GetHotel' + `/${id}`)
  }

  getCities() {
    return this.http.get<string[]>(this.hotelMainUrl + 'GetCities')
  }

  getHotelByCity(city: string) {
    return this.http.get<hotel[]>(this.hotelMainUrl + 'GetHotels?city=' + `${city}`)
  }

  getRoomTypes() {
    return this.http.get<roomType[]>(this.roomMainUrl + 'GetRoomTypes')
  }

  getRoomById(id: number) {
    return this.http.get<room>(this.roomMainUrl + 'GetRoom/' + `${id}`)
  }

  getBookedRooms() {
    return this.http.get<bookedRoom[]>(this.bookingMainUrl)
  }

  getAllRooms() {
    return this.http.get<room[]>(this.roomMainUrl + 'GetAll')
  }

  getFilteredRooms(data: filteredRoom) {
    return this.http.post(this.filterUrl, JSON.stringify(data), { headers: this.headers })
  }

  getFilteredRoomTypes(data: filteredRoomType) {
    return this.http.post(this.filterUrl, JSON.stringify(data), { headers: this.headers })
  }

  bookRoom(data: bookRoomData) {
    return this.http.post(this.bookingMainUrl, JSON.stringify(data), {
      headers: this.headers,
      responseType: 'text'
    });
  }

  cancelBooking(id: number) {
    return this.http.delete(this.bookingMainUrl + `/${id}`, {
      headers: this.headers,
      responseType: 'text'
    })
  }
}
