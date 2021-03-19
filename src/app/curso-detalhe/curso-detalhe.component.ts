import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCursoService } from 'src/service/api-curso.service';
import { Curso } from 'src/model/curso';

@Component({
  selector: 'app-curso-detalhe',
  templateUrl: './curso-detalhe.component.html',
  styleUrls: ['./curso-detalhe.component.css']
})
export class CursoDetalheComponent implements OnInit {

  curso: Curso = { idCurso: null, descricaoAssunto: '', dataInicio: null, dataTermino: null, quantidadeAlunosTurma: null, codigoCategoria: null, descricaoCategoria: '' };
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiCursoService) { }

  ngOnInit() {
    this.getCurso(this.route.snapshot.params['idCurso']);
  }

  getCurso(idCurso) {
    this.api.getCurso(idCurso)
      .subscribe(data => {
        this.curso = data;
        console.log(this.curso);
        this.isLoadingResults = false;
      });
  }

}
