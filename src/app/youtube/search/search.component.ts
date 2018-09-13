import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersistNgFormPlugin } from '@datorama/akita';
import { YoutubeQuery } from '../state';
import { pipe, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() search = new EventEmitter();
  searchForm: FormGroup;
  persistFormKey: PersistNgFormPlugin<any>;

  private debounceTime = 300;
  private searchSub: Subscription;

  constructor(
    private youtubeQuery: YoutubeQuery,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();

    this.connectForm();
  }

  ngOnDestroy() {
    this.persistFormKey && this.persistFormKey.destroy();
    this.searchSub && this.searchSub.unsubscribe();
  }

  private buildForm() {
    this.searchForm = this.fb.group({
      search: ['']
    });
  }

  private connectForm() {
    this.persistFormKey = new PersistNgFormPlugin(this.youtubeQuery, 'q', {
      debounceTime: this.debounceTime
    })
      .setForm(this.searchForm.get('search'));

    this.searchSub = this.searchForm.valueChanges
      .pipe(
        debounceTime(this.debounceTime)
      ).subscribe(val => this.search.next());
  }
}
