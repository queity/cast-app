import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiCursoService } from 'src/service/api-curso.service';
import { Curso } from 'src/model/curso';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent implements OnInit {

  displayedColumns: string[] = [ 'acao', 'descricaoAssunto', 'dataInicio', 'dataTermino', 'descricaoCategoria' ];
  dataSource: Curso[] = [];
  isLoadingResults = false;
  cursoForm: FormGroup;

  constructor(private api: ApiCursoService, private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.cursoForm = this.formBuilder.group({
      'descricao' : [null]
    });

    this.listarCursos();

  }

  listarCursos() {
    this.api.getCursos()
    .subscribe(res => {
      this.dataSource = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  cursoPorFiltro(form: NgForm) {
    this.api.getCursoFiltro(form)
    .subscribe(res => {
      this.dataSource = res;
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  deleteCurso(idCurso: number) {
    this.isLoadingResults = true;
    this.api.deleteCurso(idCurso)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.listarCursos();
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
