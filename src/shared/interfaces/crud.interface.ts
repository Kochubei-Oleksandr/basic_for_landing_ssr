import { Observable } from 'rxjs';

export interface ICrud {
  get<T>(query: any): Observable<T[]>;
  view<T>(id: number, query: any): Observable<T>;
  create<T>(data: T): Observable<T>;
  update<T>(id: number, data: T): Observable<T>;
  remove<T>(id: number): Observable<T>;
}
