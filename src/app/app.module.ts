import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';

import { SolrApiService } from './services/solr-api.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NqiSearchComponent } from './nqi-search/nqi-search.component';


@NgModule({
  declarations: [
    AppComponent,
    NqiSearchComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, HttpClientJsonpModule,
    AppRoutingModule
  ],
  providers: [ SolrApiService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
