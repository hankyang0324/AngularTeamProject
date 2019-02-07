import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { PageInfoService } from '../shared/page-info.service'
import { DataStorageService } from '../shared/data-storage.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class TemplateComponent implements OnInit, OnDestroy {
  pageName="template";
  projects:{label:string}[]=[{label:'Project1'},{label:'Project2'}];
  selectedPro:{label:string}={label:this.pageInfoService.pageTitle};
  checkHeaders:{field:string,header:string}[]=[];
  selectedDatas:{field:string,header:string}[]=[];
  checkHeadersCols:any[];
  clientDatas:object[]=[];
  QSHeaders:{field:string,type:string,formula:string}[]=[];
  isFormula:boolean=false;
  isInputEmpty:boolean=false;
  
  constructor(private pageInfoService: PageInfoService,
    private dsService:DataStorageService,
    private router:Router) {}

  ngOnInit() {
    this.pageInfoService.pageNameUpdate.next(this.pageName);
    this.checkHeadersCols=[
      {field:'header',header:'header'},
    ];
    if(this.selectedPro.label=='Project1') {
      this.checkHeaders=this.pageInfoService.RSCHeader1;
      this.selectedDatas=this.pageInfoService.formulaHeader1;
      this.QSHeaders=this.pageInfoService.QSHeaders1;
    } else {
      this.checkHeaders=this.pageInfoService.RSCHeader2;
      this.selectedDatas=this.pageInfoService.formulaHeader2;
      this.QSHeaders=this.pageInfoService.QSHeaders2;
    }
  }

  onChangeProject(){
    this.pageInfoService.setPageTitle(this.selectedPro.label);
    this.isInputEmpty=false;
    if(this.selectedPro.label=='Project1') {
      this.pageInfoService.formulaHeader2=this.selectedDatas;
      this.pageInfoService.QSHeaders2=this.QSHeaders;
      this.checkHeaders=this.pageInfoService.RSCHeader1;
      this.selectedDatas=this.pageInfoService.formulaHeader1;
      this.QSHeaders=this.pageInfoService.QSHeaders1;
    } else {
      this.pageInfoService.formulaHeader1=this.selectedDatas;
      this.pageInfoService.QSHeaders1=this.QSHeaders;
      this.checkHeaders=this.pageInfoService.RSCHeader2;
      this.selectedDatas=this.pageInfoService.formulaHeader2;
      this.QSHeaders=this.pageInfoService.QSHeaders2;
    }
  }

  onAddQS() {
    this.QSHeaders.push({field:null,type:'Number',formula:null});
    this.isInputEmpty=true;
    (<HTMLElement>document.getElementsByClassName('ui-table-scrollable-body')[1]).scrollTop=
    (<HTMLElement>document.getElementsByClassName('ui-table-scrollable-body')[1]).scrollHeight;
  }

  onChangeInput(event: Event) {
    if((<HTMLInputElement>event.target).value=='null' || (<HTMLInputElement>event.target).value==''){
      this.isInputEmpty=true;
    } else {
      let last=this.QSHeaders.length-1;
      this.QSHeaders[last].field=(<HTMLInputElement>event.target).value;
      this.isInputEmpty=false;
    }
  }

  onDeleteQS(QSHeader:{field:string,type:string,formula:string}) {
    this.isInputEmpty=false;
    this.QSHeaders=this.QSHeaders.filter(
      (value)=>{
        return value.field!==QSHeader.field;
      }
    );
  }

  onSave(){
    if(this.selectedPro.label=='Project1') {
      this.pageInfoService.formulaHeader1=this.selectedDatas;
      this.pageInfoService.QSHeaders1=this.QSHeaders;
      console.log(this.pageInfoService.QSHeaders1);
    } else {
      this.pageInfoService.formulaHeader2=this.selectedDatas;
      this.pageInfoService.QSHeaders2=this.QSHeaders;
      console.log(this.pageInfoService.QSHeaders2);
    }
    this.router.navigate(['./formula']);
  }

  ngOnDestroy() {
    this.pageInfoService.UpdateHeaderFieldSet(); //更改QSHeader后，需要更新header里的属性
    this.dsService.deleteAttr(); //更改QSHeader后会更改data属性，需要删除被更改的属性
  }
}
