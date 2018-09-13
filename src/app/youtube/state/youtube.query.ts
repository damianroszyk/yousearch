import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { YoutubeStore, YoutubeState } from './youtube.store';
import { Youtube } from './youtube.model';

@Injectable({
  providedIn: 'root'
})
export class YoutubeQuery extends QueryEntity<YoutubeState, Youtube> {

  constructor(protected store: YoutubeStore) {
    super(store);
  }

  toggleFavorite(id: string) {
    this.store.update(id, entity => ({
      ...entity,
      snippet: {
        ...entity.snippet,
        favorite: !entity.snippet.favorite
      }
    }));
  }
}
