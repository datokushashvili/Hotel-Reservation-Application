import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelsService } from 'src/app/services/hotels.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { bookRoomData, room } from 'src/app/models/room';


@Component({
  selector: 'app-room-reservation',
  templateUrl: './room-reservation.component.html',
  styleUrls: ['./room-reservation.component.scss']
})
export class RoomReservationComponent implements OnInit {

  roomId: number;
  hotelRoomReservation: room;
  bookForm: FormGroup;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private hotelService: HotelsService, private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      checkIn: ['', Validators.required],
      checkOut: ['', Validators.required],
      customerName: ['', Validators.required],
      customerPhone: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.roomId = +params.get('id')
      this.roomReservation(this.roomId)
    })
    this.subscribeToFormChanges();
  }
  bookedDates: any = []
  bookedDatesArray: any = []
  roomReservation(id: number) {
    this.hotelService.getRoomById(id).subscribe(response => {
      this.hotelRoomReservation = response
      this.bookedDates = response.bookedDates
      this.isLoading = false
      for (const bookedDate of this.bookedDates) {
        this.bookedDatesArray.push(new Date(bookedDate.date))
      }

    })
  }


  // booking code
  bookRoomData: bookRoomData;

  bookSuccessful: boolean = false
  deleteMessage() {
    this.bookSuccessful = false
  }

  onSubmit(id: number) {
    const { checkIn, checkOut, customerName, customerPhone } = this.bookForm.value;
    const adjustedCheckInDate = new Date(checkIn);
    const adjustedCheckOutDate = new Date(checkOut);

    adjustedCheckInDate.setMinutes(adjustedCheckInDate.getMinutes() - adjustedCheckInDate.getTimezoneOffset());
    adjustedCheckOutDate.setMinutes(adjustedCheckOutDate.getMinutes() - adjustedCheckOutDate.getTimezoneOffset());
    this.bookRoomData = {
      roomId: id,
      checkInDate: adjustedCheckInDate.toISOString(),
      checkOutDate: adjustedCheckOutDate.toISOString(),
      customerName: customerName,
      customerPhone: customerPhone,
      isConfirmed: true,
      customerId: '1'
    };

    this.isLoading = true;

    this.hotelService.bookRoom(this.bookRoomData).subscribe(
      (response: any) => {
        this.isLoading = false;
        if (response && response.includes('Booking retrieved successfully')) {
          this.bookSuccessful = true
        } else {
          alert('Error while booking');
        }
        console.log(response);
      },
      (error: any) => {
        console.error(error);
      }

    );
  }


  // price calculations
  diffDays: number;

  totalDaysCalc() {
    const checkInDate = new Date(this.bookForm.value.checkIn);
    const checkOutDate = new Date(this.bookForm.value.checkOut);

    if (!isNaN(checkInDate.getTime()) && !isNaN(checkOutDate.getTime())) {
      const timeDiff = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
      this.diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    } else {
      this.diffDays = 0;
    }
  }

  subscribeToFormChanges() {
    this.bookForm.valueChanges.subscribe(() => {
      this.totalDaysCalc();
    });
  }


  // compare dates
  totalPriceMessage: boolean = false;
  inappropriateDates: boolean = false;
  compareDates(): void {
    const checkInDate = this.bookForm.get('checkIn')?.value;
    const checkOutDate = this.bookForm.get('checkOut')?.value;

    if (checkInDate && checkOutDate) {
      if (checkInDate < checkOutDate) {
        console.log('Check-in date is older than Check-out date');
        this.totalPriceMessage = true;
        this.inappropriateDates = false;
      } else if (checkInDate >= checkOutDate) {
        console.log('Check-in date is newer than Check-out date');
        this.totalPriceMessage = false;
        this.inappropriateDates = true;
      }
    } else {
      console.log('Please select both Check-in and Check-out dates');
    }
  }


  // time validations
  getCurrentDate(): string {
    const currentDate = new Date();
    const adjustedDate = new Date(currentDate.getTime() - (currentDate.getTimezoneOffset() * 60000)); // Adjust to UTC timezone
    return adjustedDate.toISOString().substring(0, 10);
  }

  get checkInValue() {
    return this.bookForm.get('checkIn').value;
  }
  get minCheckOutDay(): Date {
    const checkInDate: Date = this.checkInValue;
    const nextDay: Date = new Date(checkInDate);
    nextDay.setDate(checkInDate.getDate() + 1);
    return nextDay;
  }



  dateFilter = (d: Date): boolean => {
    const time = d ? d.getTime() : 0;
    if (!this.bookedDatesArray || !Array.isArray(this.bookedDatesArray)) {
      return true;
    }
    return !this.bookedDatesArray.some(x => x && x.getTime() === time);
  }



  // Overview section buttons
  overview: boolean = true;
  facilities: boolean = false;
  extra: boolean = false;

  overviewbutton() {
    this.overview = true;
    this.facilities = false;
    this.extra = false;
  }
  facilitiesbutton() {
    this.overview = false;
    this.facilities = true;
    this.extra = false;
  }
  extrabutton() {
    this.overview = false;
    this.facilities = false;
    this.extra = true;
  }

  images: any
}


