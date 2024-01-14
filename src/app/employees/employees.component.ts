import {Component} from '@angular/core';
import {AsyncPipe, CommonModule, DecimalPipe, JsonPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgbHighlight, NgbModule, NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {EmployeeClientService} from "../clients/employee-client.service";
import {EmployeesResponseDTO} from "../models/employees-response-dto";
import {RouterOutlet} from "@angular/router";
import {HttpClientModule} from "@angular/common/http";
import {EmployeeDTO} from "../models/employee-dto";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatPaginatorModule, PageEvent} from "@angular/material/paginator";
import {MatSortModule, Sort} from "@angular/material/sort";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {EditEmployeeComponent} from "../edit-employee/edit-employee.component";
import {MatDialog} from "@angular/material/dialog";
import {AddEmployeeComponent} from "../add-employee/add-employee.component";

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule,
    NgbModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatTableModule, MatSortModule,
    MatButtonModule, MatMenuModule, MatIconModule,
    JsonPipe],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {

  filteredElements: EmployeeDTO = new EmployeeDTO();
  direction = "ASC";
  sortElement = "id";
  pageNumber = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  numberOfElements = 0;
  employees: EmployeeDTO[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email','phone','salary','action'];
  dataSource = new MatTableDataSource(this.employees);

  constructor(private employeeClient: EmployeeClientService,public dialog: MatDialog) {
    this.getEmployees(this.filteredElements, this.direction, this.sortElement, this.pageNumber, this.pageSize);
  }

  announceSortChange(sortState: Sort) {
    this.sortElement = sortState.active;
    this.pageNumber = 0;
    this.direction = sortState.direction.toLocaleUpperCase();
    this.getEmployees(this.filteredElements, this.direction,
      this.sortElement, this.pageNumber, this.pageSize);
  }

  onChangePage(event: PageEvent) {
    console.debug(event);
    this.pageNumber = event.pageIndex;
    this.getEmployees(this.filteredElements, this.direction,
      this.sortElement, this.pageNumber, this.pageSize);
  }

  getEmployees(data: EmployeeDTO, direction: string, sortElement: string, pageNumber: number, pageSize: number) {
    this.employeeClient.getAllEmployees(data, direction, sortElement, pageNumber, pageSize)
      .subscribe(data => {
        this.pageNumber = data.number;
        this.totalPages = data.totalPages;
        this.totalElements = data.totalElements;
        this.numberOfElements = data.numberOfElements;
        this.employees = data.employees;
      });
  }

  removeEmployee(id:number){
    this.employeeClient.removeEmployee(id).subscribe(data=>{
      this.employees= this.employees.filter((e, i) => id !== e.id);
    });
  }

  reloadData(){
    this.filteredElements= new EmployeeDTO();
    this.direction = "ASC";
    this.sortElement = "id";
    this.getEmployees(this.filteredElements, this.direction, this.sortElement, this.pageNumber, this.pageSize);
  }


  updateEmployee(element: EmployeeDTO) {
    console.info(element);
    const dialogRef = this.dialog.open(EditEmployeeComponent,{
      data: element
    });
  }

  addEmployee() {
    const dialogRef = this.dialog.open(AddEmployeeComponent,{
      data: {callbackFunction:()=>{
          this.reloadData()
        }}
    });
  }
}
