import { Injectable } from '@angular/core';
import { PageInfoService } from './page-info.service'
import { ThrowStmt } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  clientDatas=[
    {
      'code':'00 00 00',
      'name':'General Conditions'
    },
    {
      'code':'00 00 01',
      'name':'Non-Reimbursable'
    },
    {
      'code':'00 31 02',
      'name':'Permits'
    },
    {
      'code':'00 00 03',
      'name':'General Conditions'
    },
    {
      'code':'00 00 04',
      'name':'Non-Reimbursable'
    },
    {
      'code':'00 31 05',
      'name':'Permits'
    },
    {
      'code':'00 00 06',
      'name':'General Conditions'
    },
    {
      'code':'00 00 07',
      'name':'Non-Reimbursable'
    },
    {
      'code':'00 31 08',
      'name':'Permits'
    },
    {
      'code':'00 00 09',
      'name':'General Conditions'
    },
    {
      'code':'00 00 10',
      'name':'Non-Reimbursable'
    },
    {
      'code':'00 31 11',
      'name':'Permits'
    },
    {
      'code':'00 00 12',
      'name':'General Conditions'
    },
    {
      'code':'00 00 13',
      'name':'Non-Reimbursable'
    },
    {
      'code':'00 31 14',
      'name':'Permits'
    },
    {
      'code':'00 01 15',
      'name':'Non-Reimbursable'
    },
    {
      'code':'01 31 16',
      'name':'Permits'
    },
    {
      'code':'00 30 17',
      'name':'General Conditions'
    },
    {
      'code':'00 04 18',
      'name':'Non-Reimbursable'
    },
    {
      'code':'04 31 19',
      'name':'Permits'
    },
    {
      'code':'06 04 20',
      'name':'Non-Reimbursable'
    },
    {
      'code':'02 31 21',
      'name':'Permits'
    },
  ];

  constructor(private pageInfoService: PageInfoService){}

  deepClone(source:any){
    return JSON.parse(JSON.stringify(source));
  }

  project1Data:Object[]=this.deepClone(this.clientDatas);//深拷贝，完全不影响clientData
  project2Data:Object[]=this.deepClone(this.clientDatas);
  project1DataLeft:Object[]=[...this.project1Data];//浅拷贝，删增元素互不影响，更改元素属性互相影响
  project2DataLeft:Object[]=[...this.project2Data];
  project1DataShared:Object[]=[];
  project2DataShared:Object[]=[];


  dataReset(){
    this.project1Data=this.deepClone(this.clientDatas);
    this.project2Data=this.deepClone(this.clientDatas);
    this.project1DataLeft=[...this.project1Data];
    this.project2DataLeft=[...this.project2Data];
    this.project1DataShared=[];
    this.project2DataShared=[];
  }

  deleteAttr(){
    for(let item of this.project1Data) {
      for(let attr in item) {
        if(!this.pageInfoService.headerFieldSet1.has(attr)){
          delete item[attr];
        }
      }
    }
    for(let item of this.project2Data) {
      for(let attr in item) {
        if(!this.pageInfoService.headerFieldSet2.has(attr)){
          delete item[attr];
        }
      }
    }
  }
}
