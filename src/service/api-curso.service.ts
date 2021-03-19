import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Curso } from 'src/model/curso';
import { MatSnackBar } from '@angular/material/snack-bar';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = 'http://localhost:8080/curso';

@Injectable({
  providedIn: 'root'
})
export class ApiCursoService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  getCursos (): Observable<Curso[]> {
    const url = `${apiUrl}/listar`;
    return this.http.get<Curso[]>(url)
      .pipe(
        tap(cursos => console.log('leu os cursos')),
        catchError(this.handleError('getCursos', []))
      );
  }

  getCursoFiltro (curso): Observable<Curso[]> {
    const url = `${apiUrl}/listar`;
    const params = new HttpParams().append('descricao', curso.descricao);
    return this.http.get<Curso[]>(url, {params}).pipe(
        tap(cursos => console.log('leu os cursos filtro')),
        catchError(this.handleError('getCursoFiltro', []))
    );
  }

  getCurso(idCurso: number): Observable<Curso> {
    const url = `${apiUrl}/${idCurso}`;
    return this.http.get<Curso>(url).pipe(
      tap(_ => console.log(`leu o curso idCurso=${idCurso}`)),
      catchError(this.handleError<Curso>(`getCurso idCurso=${idCurso}`))
    );
  }

  addCurso (curso): Observable<Curso> {
    const url = `${apiUrl}/inserir`;
    return this.http.post<Curso>(url, curso, httpOptions).pipe(
      tap((curso: Curso) => console.log(`adicionou o curso com w/ idCurso=${curso.idCurso}`)),
      catchError(this.handleError<Curso>('addCurso'))
    );
  }

  updateCurso(idCurso, curso): Observable<any> {
    const url = `${apiUrl}/editar/${idCurso}`;
    return this.http.put(url, curso, httpOptions).pipe(
      tap(_ => console.log(`atualiza o curso com idCurso=${idCurso}`)),
      catchError(this.handleError<any>('updateCurso'))
    );
  }

  deleteCurso (idCurso): Observable<Curso> {
    const url = `${apiUrl}/excluir/${idCurso}`;

    return this.http.delete<Curso>(url, httpOptions).pipe(
      tap(_ => console.log(`remove o curso com idCurso=${idCurso}`)),
      catchError(this.handleError<Curso>('deleteCurso'))
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
