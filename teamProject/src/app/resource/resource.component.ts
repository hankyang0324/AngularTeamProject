import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PageInfoService } from '../shared/page-info.service'
import { DataStorageService } from '../shared/data-storage.service'
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ResourceComponent implements OnInit, OnDestroy {
  pageName="resource";
  projects:{label:string}[]=[{label:'Project1'},{label:'Project2'}];
  selectedPro:{label:string}={label:this.pageInfoService.pageTitle};
  clientDatas:object[];
  cols:any[];
  addInfo:object;
  addHeader:string;
  ifAdding:boolean=false;
  lastColHeaderName:string;
  globalFilterFields:string[]=['name','code'];
  searching:string;

  constructor(private pageInfoService: PageInfoService,
              private dsService:DataStorageService,
              private router:Router) {}

  ngOnInit() {
    this.pageInfoService.pageNameUpdate.next(this.pageName);
    if(this.selectedPro.label=='Project1'){
      this.clientDatas=this.dsService.project1Data;
      this.cols=this.pageInfoService.RSCHeader1;
    } else {
      this.clientDatas=this.dsService.project2Data;
      this.cols=this.pageInfoService.RSCHeader2;
    }
    let lastclientData=this.clientDatas[this.clientDatas.length-1];
    for(let item in lastclientData) {
      if(item!=='name' && item!=='code'){
        this.globalFilterFields.push(item);
      }
    }
    this.addInfo={'code':'','name':''};
    this.addHeader='';
    this.searching='';
  }

  onChangeProject() {
    this.pageInfoService.setPageTitle(this.selectedPro.label);
    if(this.selectedPro.label=='Project1'){
      this.clientDatas=this.dsService.project1Data;
      this.cols=this.pageInfoService.RSCHeader1;
    } else {
      this.clientDatas=this.dsService.project2Data;
      this.cols=this.pageInfoService.RSCHeader2;
    }   
    let lastclientData=this.clientDatas[this.clientDatas.length-1];
    for(let item in lastclientData) {
      if(item!=='name' && item!=='code'){
        this.globalFilterFields.push(item);
      }
    }
    this.addInfo={'code':'','name':''};
    this.addHeader='';
    this.searching='';
  }

  transformHeader(header:string) {
    if(header==='name') return 'RESOURCE NAME';
    if(header==='cost_code') return 'RESOURCE CODE';
    return header;
  }

  onAddCol(){
    (<HTMLElement>document.getElementsByClassName("popover")[0]).style.display="none";
    if(!this.ifAdding){
      let tbScoll=(<HTMLElement>document.getElementsByClassName('ui-table-scrollable-body')[0]);
      tbScoll.scrollLeft=tbScoll.scrollWidth;
      let tb2Scoll=(<HTMLElement>document.getElementsByClassName('ui-table-scrollable-view')[0]);
      tb2Scoll.scrollLeft=tb2Scoll.scrollWidth;
      this.cols.push({field:'',header:''});
      this.addHeader='';
      this.ifAdding=true;
      (<HTMLElement>document.getElementsByClassName('ui-table-scrollable-body')[0]).scrollLeft=
      (<HTMLElement>document.getElementsByClassName('ui-table-scrollable-body')[0]).scrollWidth; 
    }
  }

  onCheckAddCol(){
    let last=this.cols.length-1;
    if(this.addHeader==='' || this.addInfo.hasOwnProperty(this.addHeader)) //空白或重复不执行
      return;
    this.cols[last]["header"]=this.addHeader;
    this.cols[last]["field"]=this.addHeader;
    this.addInfo[this.addHeader]='';
    this.globalFilterFields.push(this.addHeader);
    this.ifAdding=false;
    
  }

  onCancelCol(){
    this.cols.pop();
    this.ifAdding=false;
  }
  
  onAddRow(){
    if(!this.ifAdding){
      for(let item in this.addInfo) //清空输入框信息
        this.addInfo[item]='';
      this.ifAdding=true;
      let newClientData:object={code:'',name:''};
      for(let col of this.cols)
        newClientData[col['field']]='';
      this.clientDatas.push(newClientData);
      (<HTMLElement>document.getElementsByClassName("ui-paginator-last")[0]).click(); 
      (<HTMLElement>document.getElementsByClassName('ui-table-scrollable-body')[0]).scrollTop=
      (<HTMLElement>document.getElementsByClassName('ui-table-scrollable-body')[0]).scrollHeight;
    }
  }

  onAddInfo(){
    let last=this.clientDatas.length-1; 
    if(this.addInfo['code']===''||this.addInfo['name']==='')//name和code有空白时不执行
      return;
    for(let col of this.cols)
      this.clientDatas[last][col['field']]=this.addInfo[col['field']];
    if(this.selectedPro.label=='Project1'){
      this.dsService.project1DataLeft.push(this.clientDatas[last]);
    } else {
      this.dsService.project2DataLeft.push(this.clientDatas[last]);
    }
    this.ifAdding=false;
  }

  onCancelInfo(){
    this.clientDatas.pop();
    this.ifAdding=false;
  }

  onSubmit(){
    this.router.navigate(['./project']);
  }

  ngOnDestroy(){
    let last=this.cols.length-1;
    if(this.cols[last]['header']=='')
      this.onCancelCol();
    last=this.clientDatas.length-1;
    if( this.clientDatas[last]['name']=='')
      this.onCancelInfo();
  }
}
