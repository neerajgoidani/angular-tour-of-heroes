import { Component, OnInit } from '@angular/core';
import { HeroService } from "../hero.service";
import { Hero } from "../hero";

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  constructor(private heroService : HeroService) { }

  heroFound : Hero;
  heroListFound : Hero[];
  ngOnInit() {
  }

  search(name : string)
  {
    this.heroService.searchHeroes(name).subscribe(hero => {this.heroFound == hero; console.log(this.heroFound); });
   // console.log(this.heroFound);
  }


  getList()
  {
    this.heroService.getHeroListHttpFake().subscribe(heroList => {this.heroListFound == heroList; console.log(this.heroListFound); });
   // console.log(this.heroFound);
  }




}
