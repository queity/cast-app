import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiCursoService } from 'src/service/api-curso.service';

@Component({
  selector: 'app-curso-editar',
  templateUrl: './curso-editar.component.html',
  styleUrls: ['./curso-editar.component.css']
})
export class CursoEditarComponent implements OnInit {
  idCurso: number = null;
  cursoForm: FormGroup;
  descricaoAssunto: string = '';
	dataInicio: Date = null;
	dataTermino: Date = null;
	quantidadeAlunosTurma: number = null;
	codigoCategoria: number = null;
  isLoadingResults = false;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiCursoService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getCurso(this.route.snapshot.params['idCurso']);
    this.cursoForm = this.formBuilder.group({
   'descricaoAssunto' : [null, Validators.required],
   'dataInicio' : [null, Validators.required],
   'dataTermino' : [null, Validators.required],
   'quantidadeAlunosTurma' : [null],
   'codigoCategoria' : [null, Validators.required]
   });
  }

  getCurso(idCurso) {
    this.api.getCurso(idCurso).subscribe(data => {
      this.idCurso = data.idCurso;
      this.cursoForm.setValue({
        descricaoAssunto: data.descricaoAssunto,
        dataInicio: data.dataInicio,
        dataTermino: data.dataTermino,
        quantidadeAlunosTurma: data.quantidadeAlunosTurma,
        codigoCategoria: data.codigoCategoria
      });
    });
  }

  updateCurso(form: NgForm) {
    this.isLoadingResults = true;
    this.api.updateCurso(this.idCurso, form)
      .subscribe(res => {
          this.isLoadingResults = false;
          this.router.navigate(['/curso-detalhe/' + this.idCurso]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

}
