import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ICrud } from '../interfaces/crud.interface';
import { map, catchError } from "rxjs/operators"
import * as _ from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService extends ApiService implements ICrud {
  protected abstract namespace: string;
  protected abstract ModelClass: any;
  protected namespaceSingular: string;

  // @ts-ignore
  public get singularEndpoint(): string {
    return this.namespaceSingular ? this.namespaceSingular : this.namespace;
  }

  public get<T>(params?: any): Observable<any> {
    this.setRequestStatus(false);

    return this
      .sendGet(this.getEndpoint(this.namespace), {params: params})
      .pipe(
        map((res: Response | any) => this.buildModelFromArray(res)),
        catchError((err) => this.onError(err))
      );
  }

  public view<T>(id?: number, params?: any): Observable<any> {
    let separate = id ? '/' + id : '';
    this.setRequestStatus(false);

    return this
      .sendGet(this.getEndpoint(this.singularEndpoint + separate), {params: params})
      .pipe(
        map((res: Response |any) => this.buildModelFromObject(res)),
        catchError((err) => this.onError(err))
      )
  }

  public create<T>(data: T): Observable<any> {
    this.setRequestStatus(false);

    return this
      .sendPost(this.getEndpoint(this.singularEndpoint), data)
      .pipe(
        map((res: Response) => this.buildModelFromObject(res)),
        catchError((err) => this.onError(err))
      )
  }

  public update<T>(id: number, data: T): Observable<any> {
    this.setRequestStatus(false);

    return this
      .sendPut(this.getEndpoint(this.singularEndpoint + '/' + id), data)
      .pipe(
        map((res: Response) => this.buildModelFromObject(res)),
        catchError((err) => this.onError(err))
      )
  }

  public remove<T>(id: number): Observable<any> {
    this.setRequestStatus(false);

    return this
      .sendDelete(this.getEndpoint(this.singularEndpoint + '/' + id))
      .pipe(
        map((res: Response | any) => this.responseWithoutBuildModel(res)),
        catchError((err) => this.onError(err))
      )
  }

  public buildModelFromArray<T>(res) {
    this.setRequestStatus(true);
    return res.map((item: T) => this.buildModel<T>(_.omitBy(item, _.isNil)));
  }

  public buildModelFromObject<T>(res) {
    this.setRequestStatus(true);
    return this.buildModel<T>(_.omitBy(res, _.isNil));
  }

  public responseWithoutBuildModel<T>(res) {
    this.setRequestStatus(true);
    return <T> _.omitBy(res, _.isNil);
  }

  public buildModel<T>(data: any): T {
    return new this.ModelClass(data);
  }
}
