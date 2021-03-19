import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Categoria } from 'src/model/categoria';
import { ApiCategoriaService } from 'src/service/api-categoria.service';

@Component({
  selector: 'app-view-dialog-categoria',
  templateUrl: './view-dialog-categoria.component.html',
  styleUrls: ['./view-dialog-categoria.component.css']
})
export class ViewDialogCategoriaComponent implements OnInit {

  displayedColumns: string[] = [ 'acao', 'codigo', 'descricao'];
  dataSource: Categoria[] = [];
  isLoadingResults = false;

  constructor(
    public dialogRef: MatDialogRef<ViewDialogCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Categoria, 
    private api: ApiCategoriaService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
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

}
