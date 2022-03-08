import { TestBed } from '@angular/core/testing';

import { SolrApiService } from './solr-api.service';

describe('SolrApiService', () => {
  let service: SolrApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolrApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
