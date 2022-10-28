import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { IContentCreation } from '../../models/content-creation';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  post<T>(url: string, data: any, params?: any, headers?: any, observe?: 'body', reportProgress?: boolean): Observable<T>;
  post<T>(url: string, data: any, params?: any, headers?: any, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<T>>;
  post<T>(url: string, data: any, params?: any, headers?: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    return this.doPost<T>(url, data, false, params, headers, observe, reportProgress);
  }

  private doPost<T>(url: string, data: any, needId: boolean, params?: any, headers?: any, observe?: 'body', reportProgress?: boolean): Observable<T>;
  private doPost<T>(url: string, data: any, needId: boolean, params?: any, headers?: any, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<T>>;
  private doPost<T>(url: string, data: any, needId: boolean, params?: any, headers?: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    const httpHeaders = {} as any;
    if (headers.lazyUpdate) {
      headers.lazyUpdate.forEach((h: any) => {
        httpHeaders[h.name] = h.value;
      });
    }

    let options = {
      headers: httpHeaders,
      observe: observe,
      reportProgress: reportProgress,
    };
    if (params) {
      options = Object.assign(params, options);
    }

    return this.http.post<T>(url, data, options).pipe(
      catchError(this.onCatch),
      tap(
        res => {
          this.onSuccess(res);
        },
        (error: any) => {
          this.onError(error);
        }
      ),
      finalize(() => {
        this.onEnd();
      })
    );

  }

  get<T>(url: string, params?: any, headers?: any, observe?: 'body', reportProgress?: boolean): Observable<T>;
  get<T>(url: string, params?: any, headers?: any, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<T>>;
  get<T>(url: string, params?: any, headers?: any, observe: any = 'body', reportProgress: boolean = false): Observable<any> {
    const httpHeaders = {} as any;
    if (headers) {
      headers.forEach((h: any) => {
        httpHeaders[h.name] = h.value;
      });
    }

    let options = {
      headers: httpHeaders,
      observe: observe,
      reportProgress: reportProgress,
    };
    if (params) {
      options = Object.assign(params, options);
    }

    return this.http.get<T>(url, options).pipe(
      catchError(this.onCatch),
      tap(
        res => {
          this.onSuccess(res);
        },
        error => {
          this.onError(error);
        }
      ),
      finalize(() => {
        this.onEnd();
      })
    );
  }
  private onCatch<T>(error: any, caught: Observable<T>): Observable<T> {
    return throwError(error);
  }

  private onSuccess<T>(res: T): void {
  }

  private onError(res: any): void {
    if (res.status === 401) {
      //this.router.navigate(['login']);
    }
  }

  private onEnd(): void {
    //this.hideLoader();
  }
}
