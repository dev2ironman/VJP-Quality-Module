import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()

export class DrawingService {

  private API_URL = environment.API_URL;

  private token: string;

  constructor(private http: HttpClient) { }

  private extractData(res: any) {
    let body = res.data;
    return body || {};
  }

  private extractData1(res: any) {
    let body = res;
    return body || {};
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }


  getdrgdata(): Observable<any> {
    return this.http.get(this.API_URL+'/api/drawing/',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData));
  }

  addDrawing(datas): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/drawing/', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


  copyDrawing(datas): Observable<any> {
    return this.http.post<any>('http://localhost:3000/api/operation/copy', datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  updateDrawing(id, datas): Observable<any> {
    return this.http.put<any>('http://localhost:3000/api/drawing/' + id, datas,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }

  // getoperation(): Observable<any> {
  //   return this.http.get('http://localhost:3000/api/operation/').pipe(
  //     map(this.extractData1));
  // }



  deleteDrg(id): Observable<any> {
    return this.http.delete('http://localhost:3000/api/drawing/' + id,{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


  getHeatTreatment(): Observable<any> {
    return this.http.get(this.API_URL+'/api/master/heat',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  getCastingTolerance(): Observable<any> {
    return this.http.get(this.API_URL+'/api/master/castingtol',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  getMachiningTolerance(): Observable<any> {
    return this.http.get(this.API_URL+'/api/master/machinetol',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }
  getSpecialProcess(): Observable<any> {
    return this.http.get(this.API_URL+'/api/master/specialpro',{ headers: { Authorization: `Bearer ${this.getToken()}` } }).pipe(
      map(this.extractData1));
  }


}

