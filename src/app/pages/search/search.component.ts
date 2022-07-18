import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Weather } from 'src/app/shared/models/weather';
import { Weathers } from 'src/app/shared/models/weathers';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy  {

  subscriptions!: Subscription

  resultSearch?:  Weathers

  current: Weather.WeahtherCurrent[] = []

  locations: Weather.WeatherLocation[] =[]

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  getWeather(query: string){
    this.subscriptions =  this.weatherService.getWeather(query).pipe(
      debounceTime(400),
      distinctUntilChanged())
      .subscribe(d => {
        this.resultSearch = d
      })
  }
  ngOnDestroy(){
    this.subscriptions.unsubscribe()
  }
}
