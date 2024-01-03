import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { filteredRoom, room, roomType } from 'src/app/models/room';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent {

  allRooms: room[];
  roomTypes: roomType[];
  isLoading: boolean = true


  constructor(private roomsService: HotelsService, private fb: FormBuilder) {
    this.showAllRooms()
    this.roomsService.getRoomTypes().subscribe(response => {
      this.roomTypes = response
    })

  }

  showAllRooms() {
    this.isLoading = true;
    this.roomsService.getAllRooms().subscribe(respone => {
      this.allRooms = respone
      console.log(this.allRooms);
      this.isLoading = false;

    })
  }


  filterByRoomType(id: number) {
    this.isLoading = true;
    this.roomsService.getFilteredRoomTypes({ roomTypeId: id }).subscribe((response: room[]) => {
      this.allRooms = response
      console.log(response);
      this.isLoading = false;
    })
  }

  filterForm = this.fb.group({
    priceFrom: [''],
    priceTo: [''],
    roomTypeId: [''],
    checkIn: [''],
    checkOut: [''],
    guestsCount: ['']
  })


  onSubmit() {
    this.isLoading = true;

    const filterFormData: filteredRoom = {
      priceFrom: null,
      priceTo: null,
      roomTypeId: null,
      checkIn: null,
      checkOut: null,
      guestsCount: null
    };

    Object.keys(this.filterForm.controls).forEach(controlName => {
      const controlValue = this.filterForm.controls[controlName].value;
      if (controlValue !== '') {
        filterFormData[controlName] = controlValue;
      }
    });

    this.roomsService.getFilteredRooms(filterFormData).subscribe((response: room[]) => {
      console.log(response);
      this.allRooms = response
      this.isLoading = false;
    })
    console.log(filterFormData);

  }
  resetForm() {
    this.filterForm.reset();
  }

  activeRoom: number | null = 0;
  addActiveClass(roomId: number) {
    if (this.activeRoom !== roomId) {
      this.activeRoom = roomId
    }
  }
  
}