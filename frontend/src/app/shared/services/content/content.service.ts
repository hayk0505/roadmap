import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IContentCreation } from '../../models/content-creation';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private apiUrl = 'http://localhost:3000/content';

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private dataService: DataService) { }

  updateProfileInfo(data: IContentCreation): Observable<any> {
    const url = `${this.apiUrl}/create`;
    return this.dataService.post(url, data, null, this.httpOptions);
  }

  getContentNameAndId(): Observable<Partial<IContentCreation>> {
    const url = `${this.apiUrl}/getContentByName`;
    return this.dataService.get(url);
  }
}
