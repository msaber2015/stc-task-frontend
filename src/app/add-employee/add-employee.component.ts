import {Component, Inject, Input} from '@angular/core';
import {CommonModule} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {EmployeeDTO} from "../models/employee-dto";
import {EmployeeClientService} from "../clients/employee-client.service";

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule,
    NgbModule,
    MatButtonModule,
    MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent {

  public employee: EmployeeDTO = new EmployeeDTO();

  constructor(
    public dialogRef: MatDialogRef<AddEmployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {callbackFunction:() => void},
    private employeeClient: EmployeeClientService
  ) {
    this.employee.id = 0;
    this.employee.salary = 0;
  }

  submit() {
    this.employeeClient.addEmployee(this.employee).subscribe(data=>{
      this.data.callbackFunction();
      this.dialogRef.close();
    });
  }
}
