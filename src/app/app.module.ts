import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { appRoutingModule } from './app.routing';

import { AppComponent } from './app.component';
import { GameComponent } from './game';
import { HomeComponent } from './home';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    appRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
