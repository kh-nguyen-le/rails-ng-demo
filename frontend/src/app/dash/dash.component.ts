import { Component, OnInit, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  layout;
  grids;
  private sub: any;

  constructor (private http: HttpClient, 
    private app: AppComponent, 
    private elementRef: ElementRef,
    private route: ActivatedRoute)  {

  }

  async getData(id: Number) {
    this.layout = await this.http.get(`http://localhost:3000/layouts/${id}.json`).toPromise();
    this.grids = this.layout.grids;
    this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = this.layout.background;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.app.title = "Dashboard";
    this.sub = this.route.params.subscribe(params => {
      let id = +params['id'];
      this.getData(id);
    })
  }
  
}
