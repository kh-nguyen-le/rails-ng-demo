import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { AppComponent } from '../app.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit, OnDestroy {
  layout;
  grids;
  private sub: any;
  apiUrl = environment.apiUrl;

  constructor (private http: HttpClient, 
    private app: AppComponent, 
    private elementRef: ElementRef,
    private route: ActivatedRoute)  {

  }

  async getData(id: Number) {
    this.layout = await this.http.get(`${this.apiUrl}/layouts/${id}.json`).toPromise();
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
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
