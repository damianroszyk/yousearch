import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ServerResponse } from './youtube.model';
import { YoutubeQuery } from './youtube.query';
import { YoutubeState } from './youtube.store';

@Injectable({
  providedIn: 'root'
})
export class YoutubeDataService {

  constructor(
    private youtubeQuery: YoutubeQuery,
    private http: HttpClient) {
  }

  get(): Observable<ServerResponse> {
    let params = new HttpParams();

    params = params.append('part', 'snippet');
    params = params.append('type', 'video');

    params = this.appendParams(params);

    return this.http.get<ServerResponse>(`${environment.ytUrl}/search`, {
      params
    });
  }

  private appendParams(params: HttpParams): HttpParams {
    const paramKeys = ['maxResults', 'pageToken', 'q', 'order'];
    const requestInfo: YoutubeState = this.youtubeQuery.getSnapshot();

    paramKeys.forEach(key => {
      if (requestInfo[key]) {
        params = params.append(key, `${requestInfo[key]}`);
      }
    });

    return params;
  }
}
