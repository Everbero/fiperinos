import { TestBed } from '@angular/core/testing';

import { BingImageSearchService } from './bing-image-search.service';

describe('BingImageSearchService', () => {
  let service: BingImageSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BingImageSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
