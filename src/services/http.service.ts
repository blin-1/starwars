import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from "rxjs";

import { Character }  from 'src/models/character.model';
import { Film } from "src/models/film.model";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }
    
    formatParameter : string = "?format=json";
    
    public getCharacters() {
          
        return this.http.get<any>('assets/characters.json').pipe(map(data => data.characters));
          
    }
        
    public getFilms(characterUrl : string) {
        
        return this.http.get<Character>(characterUrl + this.formatParameter).pipe(
                mergeMap(character => 
                    {
                        let films$: Observable<Film>[] = [];
                        for (let url of character.films){
                            films$.push(this.http.get<Film>(url + this.formatParameter))
                        }
                        return forkJoin(films$);
                    }
                )
        );
            
    }
  
}
