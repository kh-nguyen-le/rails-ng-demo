import { Component, OnInit, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  layout;
  grids;
  id: Number;

  constructor (private http: HttpClient, 
    private app: AppComponent, 
    private elementRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router)  {

  }

  async getData() {
    this.layout = await this.http.get(`http://localhost:3000/layouts/${this.id}.json`).toPromise();
    this.grids = this.layout.grids;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.layout.background;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.app.title = "Dashboard";
    this.id = this.route.snapshot.params.id;
    this.getData();
  }
}
