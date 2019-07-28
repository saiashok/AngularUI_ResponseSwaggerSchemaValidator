import { Component, OnInit, OnDestroy } from '@angular/core';
import { SwaggerService } from '../service/service.component';
import { IOperationsList } from '../models/IOperationsList';
import { JsonRequestPayload } from '../models/JsonRequestPayload';
import { Subscription } from 'rxjs';

@Component({
  //providers: [SwaggerService],
  selector: 'app-user-api-select',
  templateUrl: './user-api-select.component.html',
  styleUrls: ['./user-api-select.component.scss']
})
export class UserApiSelectComponent implements OnInit {

  enteredValue = '';
  selectedOption = '';
  message = {};
  message1:string;
  json: IOperationsList;
  statusCodes: string[];
  jsonReq: JsonRequestPayload;
  selectedStatus: string;
  subscription: Subscription;

  constructor(private swaggerService: SwaggerService) {

  }

  async ngOnInit() {
      this.message=  await this.swaggerService.getOperationsList();
    this.swaggerService.currentMessage1.subscribe(message=>
      this.message1= message
    )
    this.setRequestObject();
    this.setMessage();
    //this.ngOnDestroy();
  }

  setMessage() {
    this.swaggerService.currentMessage.subscribe(message =>
      this.json = JSON.parse(message)
    );

  }

  setRequestObject() {
    this.swaggerService.requestMessage.subscribe(message =>
      this.jsonReq = message
    );
  }

  populateStatuCodes(event: { value: string }) {
    this.jsonReq.operationName = this.json.response[event.value].operationName;
    this.jsonReq.operationType = this.json.response[event.value].operationType;
    this.statusCodes = this.json.response[event.value].statusCodes;
    this.selectedStatus = this.statusCodes[0];
    this.jsonReq.statusCode = this.statusCodes[0];
    this.swaggerService.changeInRequest(this.jsonReq);
  }

  populateRequestObject(event) {
    this.jsonReq.statusCode = event.value;
    this.swaggerService.changeInRequest(this.jsonReq);
  }

}
