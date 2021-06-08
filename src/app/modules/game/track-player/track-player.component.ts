import { Component, Input, OnDestroy } from '@angular/core';
import { Track } from '../../@core/models/track.model';
import { OnAttributeChange, OnDestroyListener, takeUntilDestroy } from '@witty-services/ngx-common';
import { interval, Observable } from 'rxjs';
import { ifNotNull } from '@witty-services/rxjs-common';
import { map, switchMap, take } from 'rxjs/operators';

@OnDestroyListener()
@Component({
  selector: 'sgr-track-player',
  templateUrl: 'track-player.component.html'
})
export class TrackPlayerComponent implements OnDestroy {

  @Input()
  public track: Track;
  @Input()
  public reveal: boolean = false;

  @OnAttributeChange('track')
  public readonly track$: Observable<Track>;

  public readonly timer$: Observable<number>;

  public audio: HTMLAudioElement;

  public constructor() {
    this.timer$ = this.track$.pipe(
      ifNotNull(),
      switchMap(() => interval(1000).pipe(
        take(20)
      )),
      map((value: number) => 20 - value)
    );

    this.track$.pipe(
      takeUntilDestroy(this),
      ifNotNull()
    ).subscribe((track: Track) => {
      this.reveal = false;
      this.audio = new Audio(track.previewUrl);
      this.audio.play();
    });
  }

  public ngOnDestroy(): void {
    if (!!this.audio) {
      this.audio.pause();
    }
  }
}
