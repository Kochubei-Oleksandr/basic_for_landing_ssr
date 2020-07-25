import { ServiceLocator } from '../services/service-locator';
import { ICrud } from '../interfaces/crud.interface';
import { Observable } from 'rxjs';
import { EventEmitter } from '@angular/core';
import {Error} from 'tslint/lib/error';
import { map } from 'rxjs/operators';

export abstract class ActiveRecord {

  protected service: ICrud;
  protected abstract provider: any;
  protected abstract fields(): string[];
  public abstract id: number;

  beforeSave$: EventEmitter<any> = new EventEmitter();
  afterSave$: EventEmitter<any> = new EventEmitter();

  protected constructor(data?: any) {
    if (data) {
      this.set(data);
    }
  }

  set(data: any) {
    try {
      let dataValues = this.extractData(typeof data === 'string' ? JSON.parse(data) : data);
      Object.keys(dataValues).forEach((key) => {
        (<any>this)[key] = dataValues[key];
      });
    } catch (e) {
      console.error(e);
    }
    return this;
  }

  build() {
    if (!this.service) {
      if (!this.provider) {
        throw new Error('Provider not found');
      }
      this.service = ServiceLocator.injector.get(this.provider);
    }
    return this;
  }

  load<T>(query?: any): Observable<T> {
    this.build();
    if (this.id && this.id > 0) {
      return this.service.view(this.id, query);
    } else {
      throw new Error('Id is required');
    }
  }

  save(): Observable<any> {
    this.build();
    this.beforeSave$.emit(this);
    if (this.id && this.id > 0) {
      return this.service.update(this.id, this.beforeSave(this.extractData(this)))
        .pipe(
          map((res) => {
            this.afterSave$.emit(this);
            return res;
          })
        );
    } else {
      return this.service.create(this.beforeSave(this.extractData(this)))
        .pipe(
          map((res) => {
            this.afterSave$.emit(this);
            return res;
          })
        )
    }
  }

  destroy(): Observable<any> {
    this.build();
    if (this.id && this.id > 0) {
      return this.service.remove(this.id);
    } else {
      throw new Error('Id is required');
    }
  }

  extractData(data: any): any {
    let json: any = {};
    this.fields().forEach((field) => {
      if (data.hasOwnProperty(field)) {
        json[field] = data[field];
      }
    });
    return json;
  }

  toJSON(): any {
    return this.extractData(<any>this);
  }

  beforeSave(data: any): any {
    return data;
  }
}
