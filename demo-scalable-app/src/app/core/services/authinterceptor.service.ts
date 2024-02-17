import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      //navigate /delete cookies or whatever
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('rtoken');
      window.localStorage.removeItem('uid');
      window.localStorage.removeItem('uname');
      window.localStorage.removeItem('uemail');
      window.localStorage.removeItem('upassword');
      this.router.navigateByUrl(``);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.        
    }
    return throwError(err);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const idToken = localStorage.getItem("token");
    
    if (idToken) {
      const cloned = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + idToken)
      });
      return next.handle(cloned).pipe(catchError(x=> this.handleAuthError(x)));
    }

    else{
      const cloned = request.clone({});
      return next.handle(cloned).pipe(catchError(x=> this.handleAuthError(x)));
    }
  }
}
