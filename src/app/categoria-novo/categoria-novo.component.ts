import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiCategoriaService } from 'src/service/api-categoria.service';

@Component({
  selector: 'app-categoria-novo',
  templateUrl: './categoria-novo.component.html',
  styleUrls: ['./categoria-novo.component.css']
})
export class CategoriaNovoComponent implements OnInit {

  categoriaForm: FormGroup;
  isLoadingResults = false;
  constructor(private router: Router, private api: ApiCategoriaService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.categoriaForm = this.formBuilder.group({
      'codigo' : [null, Validators.required],
      'descricao' : [null, Validators.required]
    });
  }

  addCategoria(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCategoria(form)
      .subscribe(res => {
          const idCategoria = res['idCategoria'];
          this.isLoadingResults = false;
          this.router.navigate(['/categoria-detalhe', idCategoria]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

}
