import { Injectable } from '@angular/core';
import { PageInfoService } from './page-info.service'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService {
  
  clientDatas:object[]=[{}];
  project1Data:Object[];
  project2Data:Object[];
  project1DataLeft:Object[];
  project2DataLeft:Object[];
  project1DataShared:Object[];
  project2DataShared:Object[];

  constructor(private pageInfoService: PageInfoService, private http:HttpClient){
    this.http.get<object[]>('/users/data').subscribe(
      data=>{
        this.clientDatas=data;
        this.dataReset();
    });
  }

  deepClone(source:any){
    return JSON.parse(JSON.stringify(source));
  }

  dataReset(){
    this.project1Data=this.deepClone(this.clientDatas);//深拷贝，完全不影响clientData
    this.project2Data=this.deepClone(this.clientDatas);
    this.project1DataLeft=[...this.project1Data];//浅拷贝，删增元素互不影响，更改元素属性互相影响
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

  postData(project:number,Post:{_id:string,name:string,code:string}):Observable<any>{
    if(project===1){
      return this.http.post('/users/post1',Post);
    }
    if(project===2){
      return this.http.post('/users/post2',Post);
    }
  }
}
