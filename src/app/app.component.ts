import { Component } from "@angular/core";
import { CommonService } from "./common.service";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from "@angular/forms";
import * as CanvasJS from "../assets/canvasjs.min";
import { IData, IWdata, IPoints } from "./models/data";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  locations = ["UK", "England", "Scotland", "Wales"];
  metrics = ["Tmax", "Tmin", "Rainfall"];
  readableMetrics = ["Max temperature", "Min temperature", "Rainfall(mm)"];
  months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  formulario: FormGroup;
  data: IData;
  filtereddata: IWdata[];
  years: number[] = [];

  constructor(private commonService: CommonService, fb: FormBuilder) {
    this.formulario = fb.group({
      location: ["UK"],
      metric: ["Tmax"],
      fromDate: [2008],
      toDate: [2009]
    });
    this.getInputs();
    this.fillYears();
  }

  // convenience getter for easy access to form fields
  setToYear(e) {
    if (this.formulario.get("toDate").value < e.value) {
      this.formulario.get("toDate").setValue(e.value);
    }
  }
  get f() {
    return this.formulario.controls;
  }

  fillYears() {
    for (let i = 1900; i <= 2017; i++) {
      this.years.push(i);
    }
  }

  // Return the metric in a human form.
  getReadableMetrics(m: string) {
    return this.readableMetrics[this.metrics.indexOf(m)];
  }

  // Return the month in MM form
  getMonth(m: number) {
    return this.months[m - 1];
  }

  // Fetch the data from the service, and filter it
  getData() {
    let points: IPoints[] = [];
    this.commonService.getData(this.data).subscribe((d: IWdata[]) => {
      this.filtereddata = d.filter(
        dw => dw.year >= this.data.fromDate && dw.year <= this.data.toDate
      );
      this.filtereddata.forEach(d => {
        points.push({
          y: d.value,
          label: `${this.getMonth(d.month)}/${d.year}`
        });
      });
      this.setChart(this.data, points);
    });
  }
  //Take the data from the form,
  getInputs() {
    this.formulario.valueChanges.subscribe(d => {
      this.data = {
        metric: d.metric,
        city: d.location,
        fromDate: d.fromDate,
        toDate: d.toDate
      };
      this.getData();
    });
  }

  //Get initial values from the form
  initData() {
    this.data = {
      city: this.formulario.get("location").value,
      metric: this.formulario.get("metric").value,
      fromDate: Number(this.formulario.get("fromDate").value),
      toDate: Number(this.formulario.get("toDate").value)
    };
    this.getData();
  }

  ngOnInit() {
    this.initData();
  }

  setChart(data: IData, points) {
    const { metric, fromDate, toDate, city } = data;
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: `${this.getReadableMetrics(
          metric
        )} for ${city}, ${fromDate} - ${toDate}`
      },
      data: [
        {
          type: "column",
          dataPoints: points
        }
      ]
    });

    chart.render();
  }
}
