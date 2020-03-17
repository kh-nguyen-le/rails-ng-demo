import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigService, Layout, Grid} from '../config.service'
import { interval, Observable, of } from 'rxjs';
import { CableService } from '../cable.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit, OnDestroy {
  layout: Layout;
  grids$: Observable<Grid[]>;
  private sub: any;
  private timer: any;
  index: number;
  id: number;
  channel: ActionCable.Channel;

  constructor (private conf: ConfigService, 
    private titleService: Title, 
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private cs: CableService)  {
      this.titleService.setTitle("Dashboard");
  }

  async getData(id: number) {
    this.newChannel();
    this.layout = await this.conf.getLayoutById(id).toPromise();
    this.grids$ = of(this.layout.grids);
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

  newChannel() {
    if (this.channel != null) this.channel.unsubscribe();
    this.channel = this.cs.joinSynchroChannel('layout', this.id, {
      connected() {
        return console.log(`layout: Connected.`);
      },
      disconnected() {
        return console.log(`layout: Disconnected.`)
      },
      received: (data: Layout) => this.refresh(data)
    });
  }

  refresh (data: Layout) {
    console.log('New data received. Updating.');
    this.grids$ = of(data.grids);
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (this.id < 1) this.id = 1; //fix test-only NaN error
      this.getData(this.id);
    });
  }
  
  ngOnDestroy() {
    this.sub.unsubscribe();
    this.channel.unsubscribe();
  }
}
