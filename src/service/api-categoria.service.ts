import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Categoria } from 'src/model/categoria';
import { MatSnackBar } from '@angular/material/snack-bar';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/categoria';

@Injectable({
  providedIn: 'root'
})
export class ApiCategoriaService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getCategorias (): Observable<Categoria[]> {
    const url = `${apiUrl}/listar`;
    return this.http.get<Categoria[]>(url)
      .pipe(
        tap(categorias => console.log('leu as Categoria')),
        catchError(this.handleError('getCategorias', []))
      );
  }

  getCategoriaFiltro (categoria: any): Observable<Categoria[]> {
    const url = `${apiUrl}/listar`;
    const params = new HttpParams().append('descricao', categoria.descricao);
    return this.http.get<Categoria[]>(url, {params}).pipe(
        tap(cursos => console.log('leu as categorias filtro')),
        catchError(this.handleError('getCategoriaFiltro', []))
    );
  }

  getCategoria(idCategoria: number): Observable<Categoria> {
    const url = `${apiUrl}/${idCategoria}`;
    return this.http.get<Categoria>(url).pipe(
      tap(_ => console.log(`leu a Categoria idCategoria=${idCategoria}`)),
      catchError(this.handleError<Categoria>(`getCategoria idCategoria=${idCategoria}`))
    );
  }

  addCategoria (categoria): Observable<Categoria> {
    const url = `${apiUrl}/inserir`;
    return this.http.post<Categoria>(url, categoria, httpOptions).pipe(
      tap((categoria: Categoria) => console.log(`adicionou a Categoria com w/ idCategoria=${categoria.idCategoria}`)),
      catchError(this.handleError<Categoria>('addCategoria'))
    );
  }

  updateCategoria(idCategoria, categoria): Observable<any> {
    const url = `${apiUrl}/editar/${idCategoria}`;
    return this.http.put(url, categoria, httpOptions).pipe(
      tap(_ => console.log(`atualiza a Categoria com idCategoria=${idCategoria}`)),
      catchError(this.handleError<any>('updateCategoria'))
    );
  }

  deleteCategoria (idCategoria): Observable<Categoria> {
    const url = `${apiUrl}/excluir/${idCategoria}`;

    return this.http.delete<Categoria>(url, httpOptions).pipe(
      tap(_ => console.log(`remove a Categoria com idCategoria=${idCategoria}`)),
      catchError(this.handleError<Categoria>('deleteCategoria'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.snackBar.open(error.error.message, 'Fechar', {
        duration: 5000,
      });
      return of(result as T);
    };
  }

}
