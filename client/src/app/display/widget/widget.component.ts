import { Component, Input } from '@angular/core';
import { Widget } from '../../shared/models/widget.model';

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent {
  @Input() widget: Widget;
}
