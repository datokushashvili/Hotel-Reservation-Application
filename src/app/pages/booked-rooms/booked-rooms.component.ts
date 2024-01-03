import { Component, OnInit } from '@angular/core';
import { bookedRoom } from 'src/app/models/room';
import { HotelsService } from 'src/app/services/hotels.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrls: ['./booked-rooms.component.scss'],
})
export class BookedRoomsComponent implements OnInit {
  bookedRooms: bookedRoom[];
  isLoading: boolean = true;

  constructor(private hotelService: HotelsService) { }

  ngOnInit() {
    this.initializeBookedRooms();
  }

  initializeBookedRooms() {
    this.hotelService.getBookedRooms().subscribe(response => {
      this.bookedRooms = response;
      this.isLoading = false
    });
  }



  cancelSuccessful: boolean = false
  deleteMessage() {
    this.cancelSuccessful = false
  }


  cancelBooking(id: number) {
    this.isLoading = true
    this.hotelService.cancelBooking(id).pipe(
      switchMap(() => this.hotelService.getBookedRooms())
    ).subscribe(
      updatedRooms => {
        console.log('Updated rooms:', updatedRooms);
        this.bookedRooms = updatedRooms;
        this.isLoading = false
        this.cancelSuccessful = true
      },
      error => {
        console.error('Cancellation error:', error);
        alert('Error occurred during cancellation, Unable to cancel due to wrongly selected dates ' + error);
        this.isLoading = false
      }
    );
  }
}