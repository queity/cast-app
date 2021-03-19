import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiCategoriaService } from 'src/service/api-categoria.service';
import { Categoria } from 'src/model/categoria';

@Component({
  selector: 'app-categoria-detalhe',
  templateUrl: './categoria-detalhe.component.html',
  styleUrls: ['./categoria-detalhe.component.css']
})
export class CategoriaDetalheComponent implements OnInit {

  categoria: Categoria = { idCategoria: null, codigo: null, descricao: '' };
  isLoadingResults = true;
  constructor(private router: Router, private route: ActivatedRoute, private api: ApiCategoriaService) { }

  ngOnInit() {
    this.getCategoria(this.route.snapshot.params['idCategoria']);
  }

  getCategoria(idCategoria) {
    this.api.getCategoria(idCategoria)
      .subscribe(data => {
        this.categoria = data;
        console.log(this.categoria);
        this.isLoadingResults = false;
      });
  }

}
