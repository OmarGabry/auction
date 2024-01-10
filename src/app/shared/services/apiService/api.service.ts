import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private base_url: string = "https://localhost:7008/api/"
  private token: string;
  header: any
  constructor(private http: HttpClient) {  }

  api_url = (api_name: string) : string => {
    return this.base_url + api_name
  };

  set_headers(token: string){
    this.token = token
    this.header = new Headers()
    this.header.append('Token', token);
  }
  headers = (params?: HttpParams) => {
    return {headers: this.header, params: params}
  }

  get(api_name: string, params?: HttpParams){
    return this.http.get(this.api_url(api_name), this.headers(params))
  }
  put(api_name: string, payload: any){
    return this.http.put(this.api_url(api_name), payload, this.headers())
  }
  post(api_name: string, payload: any){
    return this.http.post(this.api_url(api_name), payload, this.headers())
  }
  delete(api_name: string){
    return this.http.delete(this.api_url(api_name), this.headers())
  }
  



  

}
