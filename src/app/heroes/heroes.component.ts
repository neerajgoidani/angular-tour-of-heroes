import { Component, OnInit } from '@angular/core';
import{ Hero} from '../hero';
import { HeroService } from "../hero.service";
 import { MessageService } from "../message.service";
import { HeroList } from '../mock-heroes';
//import { HeroList } from "../mock-heroes";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero :Hero ;
  heroList : Hero[];
 

  constructor(private heroService : HeroService, private messageService : MessageService) {

  }

  getHeroesList() : void
  {
    //*** this makes a normal request */

     //this.heroService.getHeroesList().subscribe(heroes => this.heroList = heroes);
     
     // getHeroesList() returns an Observable(Hero[]) 
     // this is accepted by the subscribe() into heroes parameter.
     // this is then assigned to  'heroList'  parameter 

     // this makes an HTTP request
     this.heroService.getHeroesListHttp().subscribe(heroes => this.heroList = heroes);
  }

  ngOnInit() {

    this.getHeroesList();
  }

  onClick(heroClicked : Hero)
  {
    console.log(heroClicked.name);
    this.messageService.addMessage("Hero clicked: " + heroClicked.name);
    this.selectedHero =heroClicked;
  }


  addHero(name : string) : void
  {
    if(!name){
      return;
    }
    this.heroService.addHero({name} as Hero).subscribe(hero=> this.heroList.push(hero));
  // so addHero gets called. and we pass the name as a Hero object.
    // the return type of the addHero() function in hero-service.ts is a Observable<Hero>. 
    //Once the latter comepletes, we get a call back to the subscribe() here and we know that the service 
    // has executed successfully, then we add that hero into the list from the subscribe() function.

  }


  deleteHero(hero : Hero): void
  {
  //  this.heroService.deleteHero(hero).subscribe(hero => this.heroList.filter(h => h!== hero));

    // OR

    this.heroService.deleteHero( hero).subscribe(); // if i do not have suscribe this will not work.
     /*
     If you neglect to subscribe(), the service will not send the delete request to the server!
      As a rule, an Observable does nothing until something subscribes!
    */
    this.heroList = this.heroList.filter(h => h!== hero);

    // both are correct
  }

}
