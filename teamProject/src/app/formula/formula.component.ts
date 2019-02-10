import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageInfoService } from '../shared/page-info.service'
import { DataStorageService } from '../shared/data-storage.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-formula',
  templateUrl: './formula.component.html',
  styleUrls: ['./formula.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class FormulaComponent implements OnInit {
  pageName="formula";
  projects:{label:string}[]=[{label:'Project1'},{label:'Project2'}];
  selectedPro:{label:string}={label:this.pageInfoService.pageTitle};
  clientDatas:object[];
  cols:any[];

  constructor(private pageInfoService: PageInfoService,
              private dsService:DataStorageService,
              private router:Router) {}

  ngOnInit() {
    this.pageInfoService.pageNameUpdate.next(this.pageName);
    // this.cols=[
    //   {field:'name',header:'NAME'},
    //   {field:'code',header:'COST_CODE'}
    // ];
    if(this.selectedPro.label=='Project1'){
      this.clientDatas=this.dsService.project1DataShared;
      this.cols=[...this.pageInfoService.formulaHeader1];
      for(let item of this.pageInfoService.QSHeaders1) {
        this.cols.push({field:item.field,header:item.field})
      }
    } else {
      this.clientDatas=this.dsService.project2DataShared;
      this.cols=[...this.pageInfoService.formulaHeader2];
      for(let item of this.pageInfoService.QSHeaders2) {
        this.cols.push({field:item.field,header:item.field})
      }
    }
  }

  hasFormula(field:string):boolean {
    if(this.selectedPro.label=='Project1'){
      for(let col of this.pageInfoService.QSHeaders1){
        if(col.field===field && col.type==="Formula") {
          return true;
        }
      }
    } else {
      for(let col of this.pageInfoService.QSHeaders2){
        if(col.field===field && col.type==="Formula") {
          return true;
        }
      }
    }
    return false;
  }

  calculate(clientData:object,field:string):string | number {
    if(this.selectedPro.label==='Project1') {
      let array:any[]=[];
      for(let col of this.pageInfoService.QSHeaders1) {
        if(col.field===field){
          for(let i=0,j=0;i<col.formula.length;i++){
            if(col.formula[i]=='+' || col.formula[i]=='-' || col.formula[i]=='*'|| col.formula[i]=='/' || col.formula[i]=='(' || col.formula[i]==')')  {
              if(j<i){
                if(col.formula[j]>='0' && col.formula[j]<='9' || col.formula[j]=='.') {
                  array.push(parseFloat(col.formula.substring(j,i)));
                } else {
                  array.push(parseFloat(clientData[col.formula.substring(j,i)]));
                }   
              }
              array.push(col.formula[i]);
              j=i+1;
            }
            if(i==col.formula.length-1 && col.formula[i]!='+' && col.formula[i]!='-' && col.formula[i]!='*' && col.formula[i]!='/' && col.formula[i]!='(' && col.formula[i]!=')') {
              if(col.formula[j]>='0' && col.formula[j]<='9' || col.formula[j]=='.') {
                array.push(parseFloat(col.formula.substring(j,i+1)));
              } else {
                array.push(parseFloat(clientData[col.formula.substring(j,i+1)]));
              }   
            }
          }
          console.log(array);
          return this.analyseFormula(array);
        }
      }     
    } else {
      let array:any[]=[];
      for(let col of this.pageInfoService.QSHeaders2) {
        if(col.field===field){
          for(let i=0,j=0;i<col.formula.length;i++){
            if(col.formula[i]=='+' || col.formula[i]=='-' || col.formula[i]=='*'|| col.formula[i]=='/' || col.formula[i]=='(' || col.formula[i]==')')  {
              if(j<i){
                if(col.formula[j]>='0' && col.formula[j]<='9' || col.formula[j]=='.') {
                  array.push(parseFloat(col.formula.substring(j,i)));
                } else {
                  array.push(parseFloat(clientData[col.formula.substring(j,i)]));
                }   
              }
              array.push(col.formula[i]);
              j=i+1;
            }
            if(i==col.formula.length-1 && col.formula[i]!='+' && col.formula[i]!='-' && col.formula[i]!='*' && col.formula[i]!='/' && col.formula[i]!='(' && col.formula[i]!=')') {
              if(col.formula[j]>='0' && col.formula[j]<='9' || col.formula[j]=='.') {
                array.push(parseFloat(col.formula.substring(j,i+1)));
              } else {
                array.push(parseFloat(clientData[col.formula.substring(j,i+1)]));
              }  
            }
          }
          console.log(array);
          return this.analyseFormula(array);
        }
      }
    }
  }

  analyseFormula(array:any[]){
    let op='+',num=0,curRes=0,res=0;
    for(let i=0;i<array.length;i++) {
      let c=array[i];
      if(typeof(c)=='number'){
        num=c;
      } else if (c=='(') {
        let j=i,cnt=0;
        for(;i<array.length;i++) {
          if(array[i]=='(') cnt++;
          if(array[i]==')') cnt--;
          if(cnt==0) break;
        }
        num=this.analyseFormula(array.slice(j+1,i));
      }
      if(c=="+" || c=='-' || c=='*' || c=='/' || i==array.length-1) {
        switch (op) {
          case '+': curRes+=num;break;
          case '-': curRes-=num;break;
          case '*': curRes*=num;break;
          case '/': curRes/=num;break;
        }
        if(c=='+' || c=='-' || i==array.length-1) {
          res+=curRes;
          curRes=0;
        }
        op=c;
        num=0;
      }
    }
    return res;
  }

  onChangeProject() {
    this.pageInfoService.setPageTitle(this.selectedPro.label);
    this.cols=[
      {field:'name',header:'NAME'},
      {field:'code',header:'COST_CODE'}
    ];
    if(this.selectedPro.label=='Project1'){
      this.clientDatas=this.dsService.project1DataShared;
      this.cols=[...this.pageInfoService.formulaHeader1];
      for(let item of this.pageInfoService.QSHeaders1) {
        this.cols.push({field:item.field,header:item.field})
      }
    } else {
      this.clientDatas=this.dsService.project2DataShared;
      this.cols=[...this.pageInfoService.formulaHeader2];
      for(let item of this.pageInfoService.QSHeaders2) {
        this.cols.push({field:item.field,header:item.field})
      }
    }
  }

  onSubmit(){
    for(let item of this.dsService.project1Data){
      console.log(item['_id']);
      this.dsService.postData(1,{_id:item['_id'],name:item['name'],code:item['code']}).subscribe(
        (res)=>{
          console.log(res);
        }
      )
    }
    for(let item of this.dsService.project2Data){
      this.dsService.postData(2,{_id:item['_id'],name:item['name'],code:item['code']}).subscribe(
        (res)=>{
          console.log(res);
        }
      )
    }
  }
}
