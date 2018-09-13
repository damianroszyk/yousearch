import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Youtube } from './youtube.model';

export interface YoutubeState extends EntityState<Youtube> {
  maxResults: number;
  q: string;
  pageToken: string;
  order: string;
}

const initialState: YoutubeState = {
  q: '',
  pageToken: '',
  maxResults: 10,
  order: 'relevance'
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'youtube' })
export class YoutubeStore extends EntityStore<YoutubeState, Youtube> {

  constructor() {
    super(initialState);
  }

  updateInfo(newState: Partial<YoutubeState>) {
    this.updateRoot(newState);
  }

}
