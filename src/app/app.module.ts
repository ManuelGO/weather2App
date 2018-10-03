import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material";

import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { CommonService } from "./common.service";
import { MatSelectModule } from "@angular/material/select";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatSelectModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    FormsModule,
    MatInputModule
  ],
  providers: [CommonService],
  bootstrap: [AppComponent]
})
export class AppModule {}
