import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { hotel } from 'src/app/models/hotel';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss']
})
export class HotelComponent implements OnInit {
  hotelId: number;
  hotel: hotel;
  isLoading: boolean = true;

  private routeSubscription: Subscription;

  constructor(private route: ActivatedRoute, private hotelsService: HotelsService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.hotelId = +params.get('id')
      this.getHotelInfo(this.hotelId)
    });
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  getHotelInfo(id: number) {
    this.hotelsService.getHotelById(id).subscribe(response => {
      this.hotel = response
      this.isLoading = false
    })
  };

}
