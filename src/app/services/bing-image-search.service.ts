import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BingImageSearchService {
  private bingImageSearchUrl = 'https://api.bing.microsoft.com/v7.0/images/search';

  constructor(private http: HttpClient) {}

  searchImages(query: string): Observable<any> {
    const headers = new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '9ca2cfac23b94e5fac76c9f84f6a5b1c'
    });

    const params = new HttpParams()
      .set('q', query)
      .set('count', '10'); // Defina a quantidade desejada de imagens a serem retornadas

    return this.http.get<any>(this.bingImageSearchUrl, { headers, params });
  }
}
