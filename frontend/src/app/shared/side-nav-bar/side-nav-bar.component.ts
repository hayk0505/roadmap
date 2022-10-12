import { Component, OnInit } from '@angular/core';
import { catchError, finalize, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.onSubmit();
  }

  onSubmit(): void {
      this.getContent()
      .pipe(
        tap(
          (res) => console.log(res),
          (err) => {
            
            
          }
        )
      )
      .subscribe((res: any) => {
        if (res) {
          console.log(res);
        }
      });
    }
    
  getContent(): Observable<any> {
    const userUpdateUrl = `http://localhost:3000/content/getContent`;
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.get(userUpdateUrl);
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
