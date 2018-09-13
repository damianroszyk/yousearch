import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { YoutubeRoutingModule } from './youtube-routing.module';
import { ListComponent } from './list/list.component';
import { PageComponent } from './page/page.component';
import { SearchComponent } from './search/search.component';
import { FiltersComponent } from './filters/filters.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import {
  MatCardModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    YoutubeRoutingModule,
    InfiniteScrollModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatSelectModule,
    ReactiveFormsModule
  ],
  declarations: [ListComponent, PageComponent, SearchComponent, FiltersComponent]
})
export class YoutubeModule { }
