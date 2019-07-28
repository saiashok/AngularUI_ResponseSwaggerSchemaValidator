import { Component, OnInit } from '@angular/core';
import { SwaggerService } from '../service/service.component';
import { JsonRequestPayload } from '../models/JsonRequestPayload';

@Component({
  selector: 'app-response-json',
  templateUrl: './response-json.component.html',
  styleUrls: ['./response-json.component.scss']
})
export class ResponseJsonComponent implements OnInit {

  constructor(private swaggerService: SwaggerService) { }
  enteredValue: '';
  jsonReq :  JsonRequestPayload;
  async ngOnInit() {
    this.jsonReq = await this.swaggerService.getLatestRequest();
  }

  setRequestObject(){
    this.swaggerService.requestMessage.subscribe(message=>
      this.jsonReq= message)
  }

  onchangeInResponse(){
  this.swaggerService.setResponse(this.enteredValue);
  }

  async getCompareResult(){   
    await this.swaggerService.setSwaggerCompareResponse(await this.swaggerService.getCompareReport(await this.swaggerService.getLatestRequest()));
    // this.swaggerService.changeMessage1(await this.swaggerService.getCompareReport(await this.swaggerService.getLatestRequest()));
  }

}
