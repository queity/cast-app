import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiCursoService } from 'src/service/api-curso.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewDialogCategoriaComponent } from '../view-dialog-categoria/view-dialog-categoria.component';

@Component({
  selector: 'app-curso-novo',
  templateUrl: './curso-novo.component.html',
  styleUrls: ['./curso-novo.component.css']
})
export class CursoNovoComponent implements OnInit {

  cursoForm: FormGroup;
  isLoadingResults = false;

  constructor(private router: Router, private api: ApiCursoService, private formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.cursoForm = this.formBuilder.group({
      'descricaoAssunto' : [null, Validators.required],
      'dataInicio' : [null, Validators.required],
      'dataTermino' : [null, Validators.required],
      'quantidadeAlunosTurma' : [null],
      'codigoCategoria' : [null, Validators.required],
      'descricaoCategoria' : [null]
    });
  }

  addCurso(form: NgForm) {
    this.isLoadingResults = true;
    this.api.addCurso(form)
      .subscribe(res => {
          const idCurso = res['idCurso'];
          this.isLoadingResults = false;
          this.router.navigate(['/curso-detalhe', idCurso]);
        }, (err) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  openDialog(): void {
    this.isLoadingResults = true;
    const dialogRef = this.dialog.open(ViewDialogCategoriaComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result != null) {
        this.cursoForm.patchValue({codigoCategoria: result.codigo})
        this.cursoForm.patchValue({descricaoCategoria: result.descricao})
      }
      this.isLoadingResults = false;
    });
  }

}
