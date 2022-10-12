import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'admin';
  constructor(
    private http: HttpClient,
  ) { }
  public form: FormGroup = {} as any;
  public disableForm: boolean = false;

  async ngOnInit() {
    this.form = new FormGroup({
      sectionName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      subsectionName: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }
  
  onSubmit(form: any): void {
    if (form.disabled) {
      this.form.enable();
    } else {
      this.disableForm = true;
      this.updateProfileInfo(this.form.value)
      .pipe(
        tap(
          (res) => console.log(res),
          (err) => {
            this.disableForm = false;
            this.form.disable();
          }
        )
      )
      .subscribe((res) => {
        if (res) {
          this.disableForm = false;
          this.form.disable();
        }
      });
    }
    console.log(form);
  }
  updateProfileInfo(data: ContentCration): Observable<any> {
    const userUpdateUrl = `http://localhost:3000/content/create`;
    let headers = new HttpHeaders();
    //headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Access-Control-Allow-Origin', '*');
    return this.post(userUpdateUrl, data, null, headers);
  }

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
interface ContentCration {
  id: number;
  sectionName: string;
  subsectionName: string;
  Content: string;
}