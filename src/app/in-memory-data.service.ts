import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';


@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb()
  {
    const heroList : Hero[] = 
    [
      {id:1,name:'pranoti'},    
      {id:2,name:'neeraj'},
      {id:3,name:'avani'},
      {id:4,name:'shika'},
      {id:5,name:'ritesh'},
      {id:6,name:'rohan'}
    ];
    return {heroList}; // ** here if i return only heroList , we get not value. the returned value 
                      // must be inside {} as it is needed to return an object as per the defintion
                      // of createDb()  inside InMemoryDbService  
  }


  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 6;
  }

  
  
}
