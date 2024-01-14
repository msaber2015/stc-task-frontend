import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {EmployeesResponseDTO} from "../models/employees-response-dto";
import {EmployeeDTO} from "../models/employee-dto";

@Injectable({
  providedIn: 'root'
})
export class EmployeeClientService {

  baseUrl = "http://localhost:8085/stc";

  constructor(private http: HttpClient) {
  }

  getAllEmployees(data: EmployeeDTO, direction: string, sortElement: string, pageNumber: number, pageSize:number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("direction", direction);
    queryParams = queryParams.append("sortElement", sortElement);
    queryParams = queryParams.append("pageNumber", pageNumber);
    queryParams = queryParams.append("pageSize", pageSize);
    if (data.id != null) {
      queryParams = queryParams.append("id", data.id);
    }
    if (data.firstName != null) {
      queryParams = queryParams.append("firstName", data.firstName);
    }
    if (data.lastName != null) {
      queryParams = queryParams.append("lastName", data.lastName);
    }
    if (data.email != null) {
      queryParams = queryParams.append("email", data.email);
    }
    if (data.phone != null) {
      queryParams = queryParams.append("phone", data.phone);
    }
    if (data.salary != null) {
      queryParams = queryParams.append("salary", data.salary);
    }
    return this.http.get<EmployeesResponseDTO>(this.baseUrl + "/employee", {params: queryParams});
  }

  removeEmployee(id:number) {
    return this.http.delete(this.baseUrl + "/employee/" + id);
  }

  addEmployee(employee: EmployeeDTO) {
    return this.http.post<EmployeeDTO>(this.baseUrl + "/employee", employee);
  }
}
