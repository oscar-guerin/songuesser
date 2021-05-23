import { Component, Input } from '@angular/core';
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
export class TrackPlayerComponent {

  @Input()
  public track: Track;
  @Input()
  public reveal: boolean = false;

  @OnAttributeChange('track')
  public readonly track$: Observable<Track>;

  public readonly timer$: Observable<number>;

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
      const audio: HTMLAudioElement = new Audio(track.previewUrl);
      audio.play();
    });
  }
}
