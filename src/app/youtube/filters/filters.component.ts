import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PersistNgFormPlugin } from '@datorama/akita';
import { YoutubeQuery } from '../state';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Output() filter = new EventEmitter();
  filtersForm: FormGroup;

  private debounceTime = 300;
  private persistFormMax: PersistNgFormPlugin<any>;
  private persistFormOrder: PersistNgFormPlugin<any>;
  private filtersSub: Subscription;

  constructor(
    private youtubeQuery: YoutubeQuery,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.buildForm();

    this.connectForm();
  }

  private buildForm() {
    this.filtersForm = this.fb.group({
      maxResults: [],
      order: []
    });
  }

  ngOnDestroy() {
    this.persistFormMax && this.persistFormMax.destroy();
    this.persistFormOrder && this.persistFormOrder.destroy();
    this.filtersSub && this.filtersSub.unsubscribe();
  }

  private connectForm() {
    this.persistFormMax = new PersistNgFormPlugin(this.youtubeQuery, 'maxResults', {
      debounceTime: this.debounceTime
    })
      .setForm(this.filtersForm.get('maxResults'));

    this.persistFormOrder = new PersistNgFormPlugin(this.youtubeQuery, 'order', {
      debounceTime: this.debounceTime
    })
      .setForm(this.filtersForm.get('order'));

    this.filtersSub = this.filtersForm.valueChanges
      .pipe(
        debounceTime(this.debounceTime)
      )
      .subscribe(val => this.filter.next());
  }
}
