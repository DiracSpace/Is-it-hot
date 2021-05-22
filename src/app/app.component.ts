import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NaiveBayes } from 'src/app/bayes/bayes';

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
      complete: () => this.naive_bayes()
    });
  }

  private naive_bayes() {
    let classifier = new NaiveBayes();

    classifier.train({ outlook: "rainy", temp: "hot", humidity: "high", windy: "no", is_it_hot: "no" })
    classifier.train({ outlook: "rainy", temp: "hot", humidity: "high", windy: "yes", is_it_hot: "no" })
    classifier.train({ outlook: "overcast", temp: "hot", humidity: "high", windy: "no", is_it_hot: "yes" })
    classifier.train({ outlook: "sunny", temp: "mild", humidity: "high", windy: "no", is_it_hot: "yes" })
    classifier.train({ outlook: "sunny", temp: "cool", humidity: "normal", windy: "no", is_it_hot: "yes" })
    classifier.train({ outlook: "sunny", temp: "cool", humidity: "normal", windy: "yes", is_it_hot: "no" })
    classifier.train({ outlook: "overcast", temp: "cool", humidity: "normal", windy: "yes", is_it_hot: "yes" })
    classifier.train({ outlook: "rainy", temp: "mild", humidity: "high", windy: "no", is_it_hot: "no" })
    classifier.train({ outlook: "rainy", temp: "cool", humidity: "normal", windy: "no", is_it_hot: "yes" })
    classifier.train({ outlook: "sunny", temp: "mild", humidity: "normal", windy: "no", is_it_hot: "yes" })
    classifier.train({ outlook: "rainy", temp: "mild", humidity: "normal", windy: "yes", is_it_hot: "yes" })
    classifier.train({ outlook: "overcast", temp: "mild", humidity: "high", windy: "yes", is_it_hot: "yes" })
    classifier.train({ outlook: "overcast", temp: "hot", humidity: "normal", windy: "no", is_it_hot: "yes" })
    classifier.train({ outlook: "sunny", temp: "mild", humidity: "high", windy: "yes", is_it_hot: "no" })

    let p = classifier.classify("is_it_hot", {
      outlook : "sunny",
      temp    : "cool",
      humidity: "high",
      windy   : "yes",
    });

    console.log(p);
  }

  private getJson(): Observable<any> {
    return this.http.get('./assets/file.json');
  }
}
