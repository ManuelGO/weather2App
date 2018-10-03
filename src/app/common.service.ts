import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class CommonService {
  url: string = `https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice`;
  constructor(private http: HttpClient) {
    console.log("Common service up");
  }

  getData({ metric, city }): Observable<any> {
    return Observable.create(observer => {
      this.http
        .get(
          `https://s3.eu-west-2.amazonaws.com/interview-question-data/metoffice/${metric}-${city}.json`
        )
        .pipe(map(data => data))
        .subscribe(
          data => {
            observer.next(data);
          },
          err => {
            observer.next(err);
          },
          () => {
            observer.complete();
          }
        );
    });
  }
}
