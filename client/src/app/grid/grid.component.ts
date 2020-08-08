import { Component, OnInit, Input } from '@angular/core';
import { ConfigService, Grid, Widget } from '../config.service';
import { Observable, of } from 'rxjs';
import { CableService } from '../cable.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
})
export class GridComponent implements OnInit {
  @Input() grid: Grid;
  widgets$: Observable<Widget[]>;
  channel: ActionCable.Channel;

  constructor(private conf: ConfigService, private cs: CableService) {}

  async getData(): Promise<void> {
    this.newChannel();
    const data: Grid = await this.conf.getGridById(this.grid.id).toPromise();
    this.widgets$ = of(data.widgets);
  }

  newChannel(): void {
    if (this.channel != null) {
      this.channel.unsubscribe();
    }
    this.channel = this.cs.joinSynchroChannel('grid', this.grid.id, {
      connected() {
        return console.log(`grid: Connected.`);
      },
      disconnected() {
        return console.log(`grid: Disconnected.`);
      },
      received: (data: Grid) => this.refresh(data),
    });
  }

  refresh(data: Grid): void {
    console.log('New data received. Updating.');
    this.widgets$ = of(data.widgets);
  }

  ngOnInit(): void {
    this.getData();
  }
}
