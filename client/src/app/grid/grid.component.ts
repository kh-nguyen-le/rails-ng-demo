import { Component, OnInit, Input } from '@angular/core';
import { ConfigService, Grid, Widget} from '../config.service'
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  @Input() grid;
  widgets;
  apiUrl = environment.apiUrl;
  constructor(private conf: ConfigService) { }

  async getData() {
    let data: Grid = await this.conf.getGridById(this.grid.id).toPromise();
    this.widgets = data.widgets;
  }

  ngOnInit() {
    this.getData();
  }

}
