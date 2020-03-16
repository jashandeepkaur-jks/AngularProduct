import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { IProduct } from './product';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/Operators';

@Injectable({
    providedIn:'root'
})
export class ProductService{

    //private productUrl='http://localhost:8080/api/products';
    private productUrl='api/products/products.json';

    constructor(private http:HttpClient){

    }
    getProducts():Observable<IProduct[]>{
          return this.http.get<IProduct[]>(this.productUrl).pipe(
              tap(data=> console.log('All'+JSON.stringify(data))),
              catchError(this.handleError));
    }

    private handleError(err:HttpErrorResponse){
   return throwError("error");
    }

}