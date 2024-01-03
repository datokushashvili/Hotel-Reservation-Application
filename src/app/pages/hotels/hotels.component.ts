import { Component, OnInit } from '@angular/core';
import { hotel } from 'src/app/models/hotel';
import { HotelsService } from 'src/app/services/hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss']
})
export class HotelsComponent implements OnInit {
  constructor(private hotelService: HotelsService) { }

  hotelList: hotel[];
  cities: string[];
  filteredHotelsByCity: hotel[];

  showAllHotels: boolean = true;
  showCityHotels: boolean = false;

  isLoading: boolean = true;

  ngOnInit(): void {
    this.fetchHotels();
    this.fetchCities();    
  }

  fetchHotels(): void {
    this.hotelService.getHotels().subscribe(
      (response: hotel[]) => {
        this.hotelList = response;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching hotels:', error);
      }
    );
  }

  fetchCities(): void {
    this.isLoading = true;
    this.hotelService.getCities().subscribe(
      (response: string[]) => {
        this.cities = response;
        console.log(this.cities);
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching cities:', error);
      }
    );
  }

  getHotelsByCity(city: string): void {
    this.hotelService.getHotelByCity(city.toLowerCase()).subscribe(
      (response: hotel[]) => {
        console.log(response);
        console.log(city.toLowerCase());
        this.hotelList = response;
        this.showCityHotels = true;
        this.showAllHotels = false;
      },
      (error: any) => {
        console.error(`Error fetching hotels in ${city}:`, error);
      }
    );
  }
}
