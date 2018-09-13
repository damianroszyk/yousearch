import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Youtube } from '../state';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() list: Youtube[];
  @Input() loading: boolean;
  @Output() fetch = new EventEmitter();
  @Output() toggleFav = new EventEmitter<string>();

  onScroll() {
    this.fetch.next();
  }

  watch(id: string) {
    window.open(`https://www.youtube.com/watch?v=${id}`, '_blank');
  }

  toggleFavorite(id: string) {
    this.toggleFav.next(id);
  }
}
