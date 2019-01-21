import { Component, OnInit } from '@angular/core';
import {Hero} from '../hero';
import { HeroService } from "../hero.service";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

hero : Hero;
heroList : Hero[];


getHeroListOnDashBoard() : void
{
this.heroService.getHeroesListHttp().subscribe(observableHero => this.heroList = observableHero.slice(1,4));
// this.heroService.getHeroesList().subscribe(heroes => this.heroList = heroes); 
 console.log(this.heroList);
}

  constructor(private heroService : HeroService) { }

  ngOnInit() {

    this.getHeroListOnDashBoard();
  }

}
