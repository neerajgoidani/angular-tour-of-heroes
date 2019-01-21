import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HeroList } from './mock-heroes';
import { Observable, of } from "rxjs";
import { MessageService } from "./message.service";
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { catchError,map,tap } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
// This marks the class as one that participates in the dependency injection system.
export class HeroService {

  constructor( private http: HttpClient, private messageService : MessageService) { }

  
  // :base/:collectionName
  // base is the resource to which requests are made, 
  //and collectionName is the heroes data object in the in-memory-data-service.ts.
  private heroesUrl = 'api/heroList';  // URL to web api
 
 
 





  /** Log a HeroService message with the MessageService */
private log(message: string) {
  this.messageService.addMessage(`HeroService: ${message}`);
}

  // getHeroesList() : Hero[] // return type :Hero[]
  // {
  //   return HeroList;
  // }

  // for RxJs() 

  getHeroesList() : Observable<Hero[]>
  {
    this.messageService.addMessage("Hero Service : Inside getHeroesList()");
    return of(HeroList);
  }

  /** GET heroes from the server */
 // getHeroesList()  and  getHeroesListHttp () are the same in 2 different ways
 //getHeroesList () doesnt use HTTP 
 // getHeroesListHttp () uses HTTP

getHeroesListHttp (): Observable<Hero[]> {

  //********** simple code */
  //return this.http.get<Hero[]>(this.heroesUrl);
  
// *******************with error handling *************
return this.http.get<Hero[]>(this.heroesUrl).pipe(tap(_ => this.log('fetched heroes')),catchError(this.handleError('getHeroesListHttp',[])));

}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}


  getHero(id:number): Observable<Hero>
  {
    this.messageService.addMessage(`Hero Service : Inside getHero() with id=${id}`);
    return of(HeroList.find(hero => hero.id == id)); 
  }

  getHeroHttp(id:number) : Observable<Hero>
  {
    const urlWithId = `${this.heroesUrl}/${id}`;
   return this.http.get<Hero>(urlWithId).pipe(
      tap(_ => this.log(`heroService: retrieving hero with id ${id}`)),
      catchError(this.handleError<Hero>(`hetHero id: ${id}`))
      );
  }

  updateHero(hero : Hero) : Observable<any>
  {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };



    return this.http.put(this.heroesUrl,hero,httpOptions).pipe(
      tap(_ => this.log(`id updated is: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero')) 
    );
  }

addHero(hero : Hero): Observable<Hero>
{
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };



  return this.http.post(this.heroesUrl,hero,httpOptions).pipe(
    tap((hero: Hero) => this.log(`id added is: ${hero.id}`)),
    catchError(this.handleError<Hero>('addHero')) 
  );
}

deleteHero(hero : Hero): Observable<Hero>
{
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  const id : number = hero.id;
  const url = `${this.heroesUrl}/${id}`;

  return this.http.delete<Hero>(url,httpOptions).pipe(
    tap(_ => this.log(`id deleted is: ${id}`)),
    catchError(this.handleError<Hero>('deleteHero')) 
  );

}


/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of();
  }

  const url = `${this.heroesUrl}/?name=${term}`;
  return this.http.get<Hero>(url).pipe(tap(_ => this.log(`found with name:${term}`)) ,
  catchError(this.handleError<Hero>('searchHeroes'), ));
  


}


getHeroListHttpFake() : Observable<Hero[]>
{
  //const url1 = `${this.heroesUrl}/3`;
  return this.http.get<Hero[]>(this.heroesUrl);
}



}
