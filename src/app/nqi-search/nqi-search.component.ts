import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NqiResponse } from '../interfaces/nqi-response';
import { SolrApiService } from '../services/solr-api.service';

@Component({
  selector: 'app-nqi-search',
  templateUrl: './nqi-search.component.html',
  styleUrls: ['./nqi-search.component.scss']
})
export class NqiSearchComponent implements OnInit {

  constructor(
    private solrService: SolrApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ROWS = 20;

  currentStart = 0;
  nqiResponse: NqiResponse;
  showPaginator = false;
  paginatorString = [];

  model = {query: '' };

  ngOnInit(): void {
    this.route.queryParams.subscribe( params => {

      this.currentStart = params.start;
      this.model.query = params.q;

      if ( this.model.query !== undefined ) {
        this.searchForPage(this.currentStart);
      }
    });

  }

  onSubmit(): void {

    this.router.navigateByUrl(`/search?q=${this.model.query}&start=0`);
    this.currentStart = 0;
    this.solrService.search(this.model.query, 0, this.ROWS)
      .subscribe((data: NqiResponse) => {
        this.nqiResponse = data;
        // now prepare the pagination
        this.preparePaginator();
      });
  }

  searchForPage(i: number): void {

    this.router.navigateByUrl(`/search?q=${this.model.query}&start=${i}`);
    this.currentStart = i;
    this.solrService.search(this.model.query, i * this.ROWS, this.ROWS)
    .subscribe((data: NqiResponse) => {
      this.nqiResponse = data;
      // now prepare the pagination
      this.preparePaginator();
      window.scrollTo(0, 0);
    });
  }

  preparePaginator(): void {
    if (this.nqiResponse.numFound > this.ROWS) {
      this.showPaginator = true;
      this.paginatorString = new Array();

      const firstPage = ( Math.floor(this.currentStart / 10) * 10 );
      const lastNumFoundPage = ( Math.floor(this.nqiResponse.numFound / this.ROWS) );
      const lastPage = firstPage + 9 < lastNumFoundPage ? firstPage + 9  : lastNumFoundPage;

      console.log(`currentStart: ${this.currentStart}, firstPage: ${firstPage}, lastPage: ${lastPage}, lastNumFoundPage: ${lastNumFoundPage}`);

      if (this.currentStart >= 10) {
        this.paginatorString.push({text: 'Previous', start: firstPage - 1 });
      }

      for (let i = firstPage ; i <= lastPage; i++ ){
        this.paginatorString.push( {text: i + 1, start: i} );
      }

      if (this.currentStart < lastNumFoundPage ) {
        this.paginatorString.push( {text: 'Next', start: lastPage + 1} );
      }
    }
  }
}
