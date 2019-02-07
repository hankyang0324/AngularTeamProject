import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageInfoService } from '../shared/page-info.service'
import { DataStorageService } from '../shared/data-storage.service'
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectComponent implements OnInit {
  pageName="project";
  projects:{label:string}[]=[{label:'Project1'},{label:'Project2'}];
  selectedPro:{label:string}={label:this.pageInfoService.pageTitle};
  clientDatas:Object[]=[];
  sharedDatas:Object[]=[];
  selectedDatas:Object[]=[];
  selectedDatas2:Object[]=[];
  cols:any[];

  constructor(private pageInfoService: PageInfoService,
              private dsService:DataStorageService,
              private router:Router) {}

  ngOnInit() {
    this.pageInfoService.pageNameUpdate.next(this.pageName);
    this.cols=[
      {field:'name',header:'PROJECT NAME'},
      {field:'code',header:'PROJECT CODE'}
    ];
    if(this.selectedPro.label=='Project1'){
      this.clientDatas=this.dsService.project1DataLeft;
      this.sharedDatas=this.dsService.project1DataShared;
    } else {
      this.clientDatas=this.dsService.project2DataLeft;
      this.sharedDatas=this.dsService.project2DataShared;
    }
  }

  onChangeProject() {
    this.pageInfoService.setPageTitle(this.selectedPro.label);
    if(this.selectedPro.label=='Project1'){
      this.clientDatas=this.dsService.project1DataLeft;
      this.sharedDatas=this.dsService.project1DataShared;
    } else {
      this.clientDatas=this.dsService.project2DataLeft;
      this.sharedDatas=this.dsService.project2DataShared;
    }
    this.selectedDatas=[];
    this.selectedDatas2=[];
  }

  onSelectAll() {
    if(this.selectedDatas.length!==this.clientDatas.length) {
      (<HTMLElement>document.getElementsByClassName('ui-chkbox-box')[0]).click();
    }
  }

  onClearAll() {
    if(this.selectedDatas.length!==0) {
      (<HTMLElement>document.getElementsByClassName('ui-chkbox-box')[0]).click();
    }
  }

  onShare() {
    let set=new Set<string>();
    for(let selectedData of this.selectedDatas) {
      this.sharedDatas.push(selectedData);
      set.add(selectedData['code']);
    }
    let filtered = this.clientDatas.filter(
      (value)=>{
        return !set.has(value['code']);
      });
    this.clientDatas=filtered;
    if(this.selectedPro.label=='Project1'){
      this.dsService.project1DataLeft=this.clientDatas;
      this.dsService.project1DataShared=this.sharedDatas;
    } else{
      this.dsService.project2DataLeft=this.clientDatas;
      this.dsService.project2DataShared=this.sharedDatas;
    }
    if(this.selectedDatas.length!==0){
      (<HTMLElement>document.getElementsByClassName("ui-paginator-last")[1]).click(); 
      this.selectedDatas=[];
    }
  }

  onCancel(){
    let set=new Set<string>();
    for(let selectedData of this.selectedDatas2) {
      this.clientDatas.push(selectedData);
      set.add(selectedData['code']);
    }
    this.selectedDatas=[];
    this.selectedDatas2=[];
    let filtered = this.sharedDatas.filter(
      (value)=>{
        return !set.has(value['code']);
      });
    this.sharedDatas=filtered;
    if(this.selectedPro.label=='Project1'){
      this.dsService.project1DataLeft=this.clientDatas;
      this.dsService.project1DataShared=this.sharedDatas;
    } else{
      this.dsService.project2DataLeft=this.clientDatas;
      this.dsService.project2DataShared=this.sharedDatas;
    }
    if(this.selectedDatas2.length!==0){
      (<HTMLElement>document.getElementsByClassName("ui-paginator-last")[0]).click(); 
      this.selectedDatas2=[];
    }
  }

  onSubmit(){
    this.router.navigate(['./formula']);
  }
}
