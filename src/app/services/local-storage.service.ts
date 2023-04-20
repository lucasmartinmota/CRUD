import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private key = 'my_list_persons';

  constructor() { }

  public create(object: any): void {
    const data = this.getAllData();
    data.push(object);
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  public getAllData(): any[] {
    const data = localStorage.getItem(this.key);

    if (!data) {
      return [];
    }

    return JSON.parse(data);
  }

  public update(object: any, index: number): void {
    const data = this.getAllData();
    data[index] = object;
    localStorage.setItem(this.key, JSON.stringify(data));
  }

  public delete(index: number): void {
    const data = this.getAllData();
    data.splice(index, 1);
    localStorage.setItem(this.key, JSON.stringify(data));
  }
}
