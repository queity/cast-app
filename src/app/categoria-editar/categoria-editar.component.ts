import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiCategoriaService } from 'src/service/api-categoria.service';

@Component({
  selector: 'app-categoria-editar',
  templateUrl: './categoria-editar.component.html',
  styleUrls: ['./categoria-editar.component.css']
})
export class CategoriaEditarComponent implements OnInit {

  idCategoria: number = null;
  categoriaForm: FormGroup;
  codigo: number = null;
	descricao: string = '';
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiCategoriaService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCategoria(this.route.snapshot.params['idCategoria']);
    this.categoriaForm = this.formBuilder.group({
   'codigo' : [null, Validators.required],
   'descricao' : [null, Validators.required]
   });
  }

  getCategoria(idCategoria) {
    this.api.getCategoria(idCategoria).subscribe(data => {
      this.idCategoria = data.idCategoria;
      this.categoriaForm.setValue({
        codigo: data.codigo,
        descricao: data.descricao
      });
    });
  }

  updateCategoria(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCategoria(this.idCategoria, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/categoria-detalhe/' + this.idCategoria]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
