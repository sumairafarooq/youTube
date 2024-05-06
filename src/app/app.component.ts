import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { YoutubeService } from './youtube.service';
import { takeUntil } from 'rxjs/operators';

interface VideoItem {
  items: any[]; // Define the structure as per your API response
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  videos: any[] = [];
  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private spinner: NgxSpinnerService, private youTubeService: YoutubeService) { }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 3000);
    this.videos = [];
    this.youTubeService
      .getVideosForChanel('UC_LtA_EtCr7Jp5ofOsYt18g', 15)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((lista: any) => {
        for (let element of lista.items) { // Now TypeScript knows that lista.items exists
          this.videos.push(element);
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

