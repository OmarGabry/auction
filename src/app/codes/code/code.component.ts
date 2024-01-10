import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from '../../shared/components/header/header.component';
import { Codes, CodesInterface } from '../codes';
import { ApiService } from '../../shared/services/apiService/api.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-code',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, FormsModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './code.component.html',
  styleUrl: './code.component.css',
  providers: [ApiService]
})
export class CodeComponent implements OnInit {
  public code: CodesInterface
  public parent: CodesInterface
  public form: FormGroup 
  
  public codes_list: any
  public parent_list: any
  constructor(private http: ApiService, private activated_route: ActivatedRoute, private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.get_params()
  }
  get_params(){
    this.activated_route.paramMap.subscribe((params:any) => {
      this.page_initialization(params.params['api'])
    })
  }
  /*get_params*/page_initialization(api: string){
    this.set_code(api)
    this.create_form()
    this.get_all()
    if(this.code.parent_api != ""){
      this.handel_parent(this.code.parent_api)
    }
  }
  /*get_params*//*page_initialization*/set_code(api: string){
    const code = Codes.find((c: CodesInterface) => c.api == api)
    if(code == null){
      alert("no page error needs to be handeled")
      return
    }
    this.code = code
  }
  /*get_params*//*page_initialization*/create_form(){
    this.form = this.fb.group({
      code: [''],
      name: ['', Validators.required],
      parent_code: ['']
    })
    if(this.code?.parent_api != ""){
      this.form.get("parent_code")?.addValidators(Validators.required)
    }
  }
  /*get_params*//*page_initialization*/get_all(){
    this.http.get(this.code.api).subscribe({
      next: (c: any) => {
        this.codes_list = c
      }
    })
  }
  /*get_params*//*page_initialization*/handel_parent(api: string){
    const parent = Codes.find((c: CodesInterface) => c.api == api)
    if(parent == null){
      return
    }
    this.parent = parent
    this.get_parent_list()
  }
  /*get_params*//*page_initialization*//*handel_parent*/get_parent_list(){
    this.http.get(this.parent.api).subscribe({
      next: (c: any) => {
        this.parent_list = c
      }
    })
  }

  submit(){
    const value = {
      
    }
    this.http.post(this.code.api, value).subscribe({
      next: (c: any) => {
        this.codes_list = c
      }
    })
  }


}
