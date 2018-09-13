import { Injectable } from '@angular/core';
import { YoutubeStore } from './youtube.store';
import { YoutubeDataService } from './youtube-data.service';
import { ServerResponse, Youtube } from './youtube.model';
import { transaction } from '@datorama/akita';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  constructor(private youtubeStore: YoutubeStore,
              private youtubeDataService: YoutubeDataService
  ) {}

  @transaction()
  get(clear: boolean) {
    if (clear) {
      this.youtubeStore.remove();
    }
    this.youtubeStore.setLoading(true);
    this.youtubeDataService.get()
      .subscribe(this.processResponse.bind(this));
  }

  @transaction()
  private processResponse(response: ServerResponse) {
    this.youtubeStore.add(this.mapEntities(response.items));
    this.youtubeStore.updateInfo({
      maxResults: response.pageInfo.resultsPerPage,
      pageToken: response.nextPageToken
    });
    this.youtubeStore.setLoading(false);
  }

  private mapEntities(items: any[]): Youtube[] {
    return items.map(item => ({
      ...item,
      id: item.id.videoId
    }));
  }
}
