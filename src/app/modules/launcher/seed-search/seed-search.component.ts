import { Component, Output } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { SearchService } from '../../@core/services/search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Track } from '../../@core/models/track.model';
import { onAny } from '@witty-services/rxjs-common';
import { OnAttributeChange } from '@witty-services/ngx-common';

@Component({
  selector: 'sgr-seed-search',
  templateUrl: 'seed-search.component.html',
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class SeedSearchComponent {

  @OnAttributeChange('selectedResult')
  @Output()
  public readonly seed$: Observable<Track>;

  public loading: boolean = false;
  public selectedResult: Track;

  public readonly results$: Observable<Track[]>;
  public readonly query$: Subject<string> = new Subject<string>();

  public constructor(private readonly searchService: SearchService) {
    this.results$ = this.query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      onAny(() => this.loading = true),
      switchMap((query: string) => !!query ? searchService.tracks(query) : of([])),
      onAny(() => this.loading = false)
    );
  }

  public trackByFn(item: Track): string {
    return item.id;
  }
}
