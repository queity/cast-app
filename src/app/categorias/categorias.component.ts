import { Component, OnInit } from '@angular/core';
import { ApiCategoriaService } from 'src/service/api-categoria.service';
import { Categoria } from 'src/model/categoria';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  displayedColumns: string[] = [ 'acao', 'codigo', 'descricao'];
  dataSource: Categoria[] = [];
  isLoadingResults = false;
  form: FormGroup;

  constructor(private api: ApiCategoriaService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      'descricao' : [null]
    });

    this.listarCategorias();
  }

  listarCategorias() {
    this.api.getCategorias()
    .subscribe(res => {
      this.dataSource = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  categoriaPorFiltro(form: NgForm) {
    this.api.getCategoriaFiltro(form)
    .subscribe(res => {
      this.dataSource = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  deleteCategoria(idCategoria: number) {
    this.isLoadingResults = true;
    this.api.deleteCategoria(idCategoria)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.listarCategorias();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
