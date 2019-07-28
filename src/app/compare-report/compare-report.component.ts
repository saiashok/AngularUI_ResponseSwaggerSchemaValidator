import { Component, OnInit } from '@angular/core';
import { SwaggerService } from '../service/service.component';

@Component({
  selector: 'app-compare-report',
  templateUrl: './compare-report.component.html',
  styleUrls: ['./compare-report.component.css']
})
export class CompareReportComponent implements OnInit {
  getComporeInvoked = false;
  reportResponse : any= {"matchedFields":[],

  "typeMismatches":[],
  "missingMandatoryFields":[],
  "swaggerListNotMatched":[],
  "responseListNotMatched":[]
};
  constructor(private swaggerService: SwaggerService) { }

  async ngOnInit() {
  
  await this.setResponseToComponent();

  }

 async setResponseToComponent(){

  this.reportResponse = await this.swaggerService.getSwaggerCompareResponse();
  this.swaggerService.currentMessage1.subscribe(message=>
     this.reportResponse= message
   )
  }

  

  

}
