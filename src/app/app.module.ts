import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserApiSelectComponent } from './user-api-select/user-api-select.component';
import { CompareReportComponent } from './compare-report/compare-report.component';
import { ResponseJsonComponent } from './response-json/response-json.component';
import { SwaggerReadComponent } from './swagger-read/swagger-read.component';
import { SwaggerService } from './service/service.component';
import {HttpClientModule} from '@angular/common/http';
import {NoopAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule} from '@angular/forms';
import {AutosizeModule} from 'ngx-autosize';
import {MatInputModule, MatCardModule, MatButtonModule, MatSelectModule, MatOptionModule} from '@angular/material';
import { FooterComponent } from './footer/footer.component';
import { HowToUseComponent } from './how-to-use/how-to-use.component';

@NgModule({
  declarations: [
    AppComponent,
    UserApiSelectComponent,
    CompareReportComponent,
    ResponseJsonComponent,
    SwaggerReadComponent,
    FooterComponent,
    HowToUseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatCardModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatOptionModule,
    HttpClientModule,
    FormsModule,
    AutosizeModule,
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
