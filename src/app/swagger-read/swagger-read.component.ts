import { Component, OnInit } from '@angular/core';
import { SwaggerService } from '../service/service.component';
import { IOperationsList } from '../models/IOperationsList';

@Component({
  selector: 'app-swagger-read',
  templateUrl: './swagger-read.component.html',
  styleUrls: ['./swagger-read.component.scss']
})
export class SwaggerReadComponent implements OnInit {

  enteredValue = "";
  swaggerJson = 'No CONTENT';
  operationsResponse = '';
  message = "";
  constructor(private swaggerService: SwaggerService) { }

  ngOnInit() {
    this.swaggerService.currentMessage.subscribe(message => this.message = message);
  }

  async ongetSwagger(){
    if(this.isValidURL(this.enteredValue)){
   this.operationsResponse= await  this.swaggerService.get_url(this.enteredValue, true);
  this.swaggerService.changeMessage(JSON.stringify(this.operationsResponse));
  
}else if(this.checkForJSON(this.enteredValue)){
      this.operationsResponse= await this.swaggerService.get_url(JSON.parse(this.enteredValue), false);

    }else{
      console.log("Not a valid URL or JSON");
    }
  }


  checkForJSON(enteredValue){
    try{
      JSON.parse(enteredValue);
      return true;
    }catch(err){
      return false;
    }
  }

  isValidURL(str){
    const a = document.createElement('a');
    a.href = str;
    return (a.host && a.host !== window.location.host);
  }

}
