import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Youtube, YoutubeQuery, YoutubeService } from '../state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements OnInit {
  list$: Observable<Youtube[]>;
  isLoading$: Observable<boolean>;

  constructor(
    private youtubeService: YoutubeService,
    private youtubeQuery: YoutubeQuery
  ) { }

  ngOnInit() {
    this.fetchVideos();

    this.list$ = this.youtubeQuery.selectAll();
    this.isLoading$ = this.youtubeQuery.selectLoading();
  }

  public fetchVideos(clear: boolean = false) {
    this.youtubeService.get(clear);
  }

  public toggleFavorite(id: string) {
    this.youtubeQuery.toggleFavorite(id);
  }

}
