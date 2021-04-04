import { Component, ViewChild,ViewEncapsulation } from '@angular/core';
import { CommonService } from './service';
import { OnInit } from '@angular/core';  
import {FormGroup,FormControl,Validators,FormsModule, } from '@angular/forms';   
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
// import { Component } from '@angular/core';
import {ModalDismissReasons, NgbModal,NgbModalRef, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {






  show=false;
  title = 'AngularDemo';
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['songname', 'singer','movie' ,'genre','year','Edit', 'Delete'];
  
  id :any;  
  songname : any;  
  singer: any; 
  movie : any;  
  genre: any; 
  year: any; 
  constructor(private newService :CommonService,) {
     }  
   Repdata;  
   valbutton ="Insert"; 
   
   ngOnInit() {    
    this.newService.GetUser().subscribe((data :any) => {
       this.Repdata = data
       console.log("get data => ",data);
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });  
  }
  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
  //   this.dataSource.filter = filterValue;
  // }
  onSave = function(user,isValid ?: boolean) {    
    user.mode= this.valbutton;
    console.log("edit => ", user);
     this.newService.saveUser(user)  
     .subscribe(data =>  {  alert(data.data);  
          
       this.ngOnInit();    
     }   
     , error => this.errorMessage = error )  
       
   }      
   edit = function(kk) {  
     console.log("edit => ", kk);
   this.id = kk._id;  
   this.songname= kk.songname;  
   this.singer= kk.singer; 
   this.movie= kk.movie;  
   this.genre= kk.genre;
   this.year= kk.year;   
   this.valbutton ="Update";  
   }  
     
   delete = function(id) {  
   this.newService.deleteUser(id)  
   .subscribe(data =>   { 
     alert(data.data) ; 
     this.ngOnInit();
  }, error => this.errorMessage = error )   
   } 
}

export interface User {
  songname: string;
  singer: string;
  movie: string;
  genre:string;
  year:string;

}