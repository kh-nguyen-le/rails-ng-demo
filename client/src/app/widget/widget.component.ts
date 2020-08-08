import { Component, OnInit, Input } from '@angular/core';
import { Widget } from '../config.service';
import { CableService } from '../cable.service';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  @Input() widget: Widget;
  channel: ActionCable.Channel;

  constructor(private cs: CableService) {}

  refresh(data: Widget) {
    console.log('New data received. Updating.');
    this.widget = data;
  }

  ngOnInit() {
    if (this.channel != null) {
      this.channel.unsubscribe();
    }
    this.channel = this.cs.joinSynchroChannel('widget', this.widget.id, {
      connected() {
        return console.log(`widget: Connected.`);
      },
      disconnected() {
        return console.log(`widget: Disconnected.`);
      },
      received: (data: Widget) => this.refresh(data),
    });
  }
}
