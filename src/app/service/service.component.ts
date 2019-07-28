import { Component, OnInit, Injectable } from '@angular/core';
import { JsonRequestPayload } from '../models/JsonRequestPayload';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { SwaggerReadComponent } from '../swagger-read/swagger-read.component';
import { ISwaggerResponse } from '../models/ISwaggerResponse';
import { Subject, BehaviorSubject } from 'rxjs';
import { IOperationsList } from '../models/IOperationsList';
import { isObject } from 'util';
import {environment} from '../../environments/environment'
const axios = require('axios');


@Injectable({ providedIn: 'root' })
export class SwaggerService {
  private jsnreq: JsonRequestPayload = <JsonRequestPayload>{};
  private operationsResponse = {};
  private latestReq: JsonRequestPayload= <JsonRequestPayload>{};
  private sampleResponse: '';
  private apireport = '';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  private swaggerResonse: ISwaggerResponse;
  private missionAnnouncedSource = new Subject<object>();
  private messageSource = new BehaviorSubject<any>('{ "response":[{"operationName":""}]}');
  private messageSource1 = new BehaviorSubject('');
  private requestSource = new BehaviorSubject<JsonRequestPayload>(this.jsnreq);

  currentMessage1 = this.messageSource1.asObservable();
  private compareResponseSource = new BehaviorSubject<string>('{"swaggerListNotMatchedNew":[],"virtualListNotMatchedNew":[], "missingMandatoryFields":[], "matchedFields":[], "typeMismatches":[]}');
  public currentMessage = this.messageSource.asObservable();
   requestMessage = this.requestSource.asObservable();
  public compareResultMessage = this.compareResponseSource.asObservable();

private subject = new Subject<any>();

  constructor(private httpClient: HttpClient) {}
private swaggerJson = '';
  getSwaggerResponse() {
    return this.swaggerResonse;
  }


  async get_url(str, isUrl): Promise<any> {
    if (isUrl) {
    
    let swaggerResOfURL: String= await this.getSwaggerOfURL(str);
    let opRes = await  this.getOperationsUsingAxios(JSON.stringify(swaggerResOfURL));
    return opRes;

    } else {
      this.swaggerJson= str;
      return this.getOperationsUsingAxios(JSON.parse(JSON.stringify(str)));

    }

  }

 async getOperations(swag):Promise<any> {
   await this.getOperationsUsingAxios(swag);
    this.jsnreq.swaggerFileLocation = swag;
    this.jsnreq.response= '{}';
    this.changeInRequest(this.jsnreq);
    this.httpOptions.headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    this.httpOptions.headers.append(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );
    this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    this.httpClient
      .post('/schemavalidator/swagger', this.jsnreq, this.httpOptions)
      .subscribe(
        data => {
          this.changeMessage(JSON.stringify(data));
        },
        error => {
          console.log(error);
        }
      );

      console.log("Operations Response", this.getOperationsList())
      return this.getOperationsList();
  }


 async  getOperationsUsingAxios(swag): Promise<any>{
    this.jsnreq.swaggerFileLocation = swag;
    this.jsnreq.response= '{}';
    this.changeInRequest(this.jsnreq);
    this.httpOptions.headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    this.httpOptions.headers.append(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );
    this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');

   return axios({ 
      method: 'post', 
    url: `${environment.apiBaseUrl}/schemavalidator/swagger'`, 
    headers: this.httpOptions, 
    data: this.jsnreq}
    ).then( (response)=>{
     return response.data;
    }).catch((error)=>{
      return error;
    })
  }


  async getSwaggerOfURL(url: any): Promise<any>{
  return new Promise((resolve)=>{  axios.get(url).then( function(response){
      resolve(response.data);
    });
  });
}


  getValidationReport(requestBody) {
   this.changeInRequest(requestBody);
    this.jsnreq = requestBody;
     this.httpOptions.headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    this.httpOptions.headers.append(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );
    this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
    this.httpClient
      .post('/schemavalidator/validationreport', requestBody, this.httpOptions)
      .subscribe(
        data => {
         this.changeInValidationResponse(JSON.stringify(data));
        },
        error => {
        }
      );
  }


  async  getCompareReport(requestBody): Promise<any>{
    this.changeInRequest(requestBody);
    this.jsnreq = requestBody;
     this.httpOptions.headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    this.httpOptions.headers.append(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );
    this.httpOptions.headers.append('Access-Control-Allow-Credentials', 'true');
  
     return axios({ 
        method: 'post', 
      url: `${environment.apiBaseUrl}/schemavalidator/validationreport'`, 
      headers: this.httpOptions, 
      data: requestBody}
      ).then( (response)=>{
       this.apireport= response.data;
        return response.data;
      }).catch((error)=>{
        return error;
      })
    }
  


 async changeMessage(message: string) {
  this.operationsResponse = message;
  this.messageSource.next(message); 
  }


  async changeInRequest(req: JsonRequestPayload) {
    this.latestReq = req;
    this.requestSource.next(req);

  }

  changeInValidationResponse(res: string) {
    this.compareResponseSource.next(res);
  }

  async getOperationsList(){
    return this.operationsResponse;
  }

  changeMessage1(message: string){
    this.messageSource1.next(message);
  }

  async getLatestRequest():Promise<any>{
    this.latestReq.response = this.sampleResponse;
    return new Promise((resolve)=> resolve(this.latestReq)) ;
  }

  setResponse(res){
    this.getLatestRequest();
this.sampleResponse = res;
  }

  async setSwaggerCompareResponse(res){
    
    this.apireport = res;
    this.changeMessage1(this.apireport);
  
  }

  async getSwaggerCompareResponse(){
    return  this.apireport ;
  }
}
