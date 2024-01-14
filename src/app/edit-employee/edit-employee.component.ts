import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {EmployeeDTO} from "../models/employee-dto";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {CommonModule} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {EmployeeClientService} from "../clients/employee-client.service";

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.css'
})
export class EditEmployeeComponent {

  employee!:EmployeeDTO;

  constructor(
    public dialogRef: MatDialogRef<EditEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EmployeeDTO,
    private employeeClient: EmployeeClientService
  ) {
    this.employee = new EmployeeDTO();
    this.employee.id = data.id;
    this.employee.firstName = data.firstName;
    this.employee.lastName = data.lastName;
    this.employee.phone = data.phone;
    this.employee.email = data.email;
    this.employee.salary = data.salary;
  }

  submit() {
      this.employeeClient.addEmployee(this.employee).subscribe(data=>{
        this.data.salary= this.employee.salary;
        this.data.id= this.employee.id;
        this.data.firstName= this.employee.firstName;
        this.data.lastName= this.employee.lastName;
        this.data.email= this.employee.email;
        this.data.phone= this.employee.phone;
        this.dialogRef.close();
      });
  }
}
