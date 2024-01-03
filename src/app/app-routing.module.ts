import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelComponent } from './pages/hotels/hotel/hotel.component';
import { HotelsComponent } from './pages/hotels/hotels.component';
import { HomeComponent } from './pages/home/home.component';
import { RoomReservationComponent } from './pages/hotels/hotel/room-reservation/room-reservation.component';
import { BookedRoomsComponent } from './pages/booked-rooms/booked-rooms.component';
import { RoomsComponent } from './pages/rooms/rooms.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotels/info/:id', component: HotelComponent },
  { path: 'hotels/info/:id/reservation/:id', component: RoomReservationComponent },
  { path: 'rooms/reservation/:id', component: RoomReservationComponent },
  { path: 'reservation/:id', component: RoomReservationComponent },
  { path: 'bookedRoom', component: BookedRoomsComponent },
  { path: 'rooms', component: RoomsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
