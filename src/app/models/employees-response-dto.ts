import {EmployeeDTO} from "./employee-dto";

export class EmployeesResponseDTO {
  totalPages!:number;
  totalElements!:number;
  number!:number;
  size!:number;
  numberOfElements!:number;
  employees: EmployeeDTO[] = [];
}
