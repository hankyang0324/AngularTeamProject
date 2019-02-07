import { Injectable } from '@angular/core';
import { Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PageInfoService {
  pageTitle="Project1"
  pageTitleUpdate=new Subject();
  pageNameUpdate=new Subject();
  RSCHeader1:{field:string,header:string}[]=
  [{field:'name',header:'name'},
  {field:'code',header:'cost_code'}];
  RSCHeader2:{field:string,header:string}[]=
  [{field:'name',header:'name'},
  {field:'code',header:'cost_code'}];
  formulaHeader1:{field:string,header:string}[]=
  [...this.RSCHeader1];
  formulaHeader2:{field:string,header:string}[]=
  [...this.RSCHeader2];
  QSHeaders1:{field:string,type:string,formula:string}[]=[];
  QSHeaders2:{field:string,type:string,formula:string}[]=[];
  headerFieldSet1=new Set<string>();
  headerFieldSet2=new Set<string>();

  constructor() {}

  RSCHeader1Reset() {
    this.RSCHeader1=
    [{field:'name',header:'name'},
    {field:'code',header:'cost_code'}];
  }

  RSCHeader2Reset() {
    this.RSCHeader2=
    [{field:'name',header:'name'},
    {field:'code',header:'cost_code'}];
  }

  setPageTitle(pageTitle:string) {
    this.pageTitleUpdate.next(pageTitle);
    this.pageTitle=pageTitle;
  }

  UpdateHeaderFieldSet(){
    this.headerFieldSet1.clear();
    for(let item of this.RSCHeader1){
      this.headerFieldSet1.add(item.field);
    }
    for(let item of this.QSHeaders1){
      this.headerFieldSet1.add(item.field);
    }
    this.headerFieldSet2.clear();
    for(let item of this.RSCHeader2){
      this.headerFieldSet2.add(item.field);
    }
    for(let item of this.QSHeaders2){
      this.headerFieldSet2.add(item.field);
    }
  }
}
