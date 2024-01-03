import { Component } from '@angular/core';
import { OnInit, HostListener } from '@angular/core';
import { hotel } from 'src/app/models/hotel';
import { HotelsService } from 'src/app/services/hotels.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  mainBgs: mainBg[];
  responsiveOptionsForRoomCarousel: any;
  hotels: hotel[];
  isLoading: boolean = true;

  constructor(private hotelService: HotelsService) {
    this.responsiveOptionsForRoomCarousel = [
      {
        breakpoint: '1024px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      }
    ];
  }
  showIndicators = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    if (event.target.innerWidth <= 767) {
      this.showIndicators = false;
    } else {
      this.showIndicators = true;
    }
  }


  allRooms: any
  ngOnInit(): void {

    this.hotelService.getAllRooms().subscribe(respone => {
      this.allRooms = respone
    })
    this.hotelService.getHotels().subscribe(response => {
      this.hotels = response;
      this.isLoading = false;
      this.mainBgs = [];
      for (const hotelImg of this.hotels) {
        this.mainBgs.push({ picture: hotelImg.featuredImage });
      }
    });
  }
}

interface mainBg {
  picture: string
}