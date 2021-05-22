import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'naive-bayes';

  private city_temp_data: City[] = [];
  
  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.request();
  }

  private async request() {
    this.getJson().subscribe({
      next: (data: City[]) => {
        this.city_temp_data = data;
      },
      error: message => {
        console.log("error: ", message);
      },
      complete: () => this.bayesClassifier()
    });
  }

  private bayesClassifier() {
    var bayes = require('node-bayes');
    
  }

  private getJson(): Observable<any> {
    return this.http.get('./assets/file.json');
  }
}
