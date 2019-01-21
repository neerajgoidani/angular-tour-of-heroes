import { Component, OnInit,Input } from '@angular/core';
import {Hero} from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-hero-details',
  templateUrl: './hero-details.component.html',
  styleUrls: ['./hero-details.component.css']
})
export class HeroDetailsComponent implements OnInit {

  //@Input() hero : Hero;
  hero : Hero;
 //@Input() is used to make the hero property available for binding 
 constructor(
  private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location
) {}


  getHero() : void
  {
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.getHeroHttp(id).subscribe(obtainedHero => this.hero = obtainedHero);

  }

  ngOnInit(): void {
  
    this.getHero();
  }

  goBack(): void
  {
    this.location.back();
  }

  save() : void
  {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());

  }

  delete() : void
  {
  
  }

}
