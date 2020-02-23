import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { ConfigService, Layout, Grid} from '../config.service'
import { environment } from 'src/environments/environment';
import { interval } from 'rxjs';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit, OnDestroy {
  layout: Layout;
  grids: Grid[];
  private sub: any;
  private timer: any;
  index: number;
  apiUrl = environment.apiUrl;

  constructor (private conf: ConfigService, 
    private app: AppComponent, 
    private elementRef: ElementRef,
    private route: ActivatedRoute)  {

  }

  async getData(id: number) {
    this.conf.getLayoutById(id)
      .subscribe(res => this.layout = res);
    this.grids = this.layout.grids;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.layout.background;
    this.index = 0;
    if (this.layout.duration) {
      let source = interval(this.layout.duration);
      this.timer = source.subscribe( () =>
        this.index = (this.index + 1) % this.layout.grids.length);
    } else if (this.timer != null) {
      this.timer.unsubscribe();
    }
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.app.title = "Dashboard";
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.getData(id);
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
