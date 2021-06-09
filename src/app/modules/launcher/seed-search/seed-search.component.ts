import { Component, Output } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { SearchService } from '../../@core/services/search.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Track } from '../../@core/models/track.model';
import { ifNotNull, onAny } from '@witty-services/rxjs-common';
import { OnAttributeChange, OnDestroyListener, takeUntilDestroy } from '@witty-services/ngx-common';

@OnDestroyListener()
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

  private readonly SEED_SEARCH_TRACK_STORAGE_KEY: string = 'launcherSeedTrack';

  public constructor(private readonly searchService: SearchService) {
    this.results$ = this.query$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      onAny(() => this.loading = true),
      switchMap((query: string) => !!query ? searchService.tracks(query) : of([])),
      onAny(() => this.loading = false)
    );

    const storedSeedSearchTrack: Track = new Track(JSON.parse(localStorage.getItem(this.SEED_SEARCH_TRACK_STORAGE_KEY)));
    if (!!storedSeedSearchTrack && !!storedSeedSearchTrack.id) {
      this.selectedResult = storedSeedSearchTrack;
    }

    this.seed$.pipe(
      takeUntilDestroy(this),
      ifNotNull()
    ).subscribe((seed: Track) =>
      localStorage.setItem(this.SEED_SEARCH_TRACK_STORAGE_KEY, JSON.stringify(seed))
    );
  }

  public trackByFn(item: Track): string {
    return item.id;
  }
}
