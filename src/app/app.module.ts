import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http"; 

import { MatSelectModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatTableModule} from '@angular/material/table'
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { MatSortModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
