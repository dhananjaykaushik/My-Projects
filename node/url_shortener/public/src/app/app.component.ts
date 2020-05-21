import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  BASE_URL = `http://localhost:5000`

  urls: urlItem[];
  constructor(
    private http: HttpClient
  ) { }


  ngOnInit() {
    this.populateUrls();
  }

  populateUrls() {
    this.http.get(`${this.BASE_URL}/urls`).subscribe(
      res => {
        this.urls = res['response'];
      }
    );
  }

  createUrl($event, url) {
    $event.preventDefault();
    if (url) {
      this.http.post(`${this.BASE_URL}/urls/minify`, {
        url: url
      }).subscribe(
        res => {
          console.log(res);
          this.populateUrls();
        }
      );
    }
  }

}

interface urlItem {
  minifiedUrl;
  originalUrl;
  count;
}
