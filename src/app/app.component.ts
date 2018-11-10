import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { MatSelectChange } from "@angular/material/select";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

import { HttpService } from "src/services/http.service";

import { Character } from 'src/models/character.model';
import { Film } from 'src/models/film.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
    
    characters           : Character[];
    characterName        : string = null;
    friendlyErrorMessage : string = null;

    dataSource          : MatTableDataSource<Film>;
    displayedColumns    : string[] = ['title', 'release_date', 'director', 'producer', 'opening_crawl'];

    @ViewChild(MatPaginator)  paginator:  MatPaginator;
    @ViewChild(MatSort)       sort:       MatSort;
    
    @ViewChild('filter')      filter:     ElementRef;
      
    constructor(private HttpService: HttpService) {};
        
    ngOnInit(){
      
        this.HttpService.getCharacters().subscribe(
                characters => this.characters = characters,
                error =>  this.handleError (error, "Oops! The Starship has crushed ... Please contact The Engineers :)")
                );
        
    }
    
    onCharacterSelected(url: MatSelectChange) {

        this.characterName         = url.source.triggerValue;
        this.friendlyErrorMessage  = null;

        this.HttpService.getFilms(url.value).subscribe(
            films => this.displayFilms(films),
            error => this.handleError(error, "Oops! Cannot get films for " + this.characterName + "... Please try again later")
        );
                
    }
    
    displayFilms(films : Film[]){
        
        this.dataSource = new MatTableDataSource(films);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        
        // this.dataSource.filter = null; 
        // this unfortunately updates filter value, but not the screen,
        // so instead use native element mechanism with viewChild to update the screen
        this.filter.nativeElement.value = null;
                
    }
    
    applyFilter(filterValue: string) {
        
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      
    }
    
    handleError(error,message){
        
        console.log(error);
        this.friendlyErrorMessage = message;// shows error panel (sometimes with this.characterName)
        this.characterName = null; // hides films panel
        
    }
      
}
