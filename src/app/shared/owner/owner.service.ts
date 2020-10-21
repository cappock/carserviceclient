import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from '../car/car.service';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  public API = '//thawing-chamber-47973.herokuapp.com';
  public OWNER_API = this.API + '/owners';
  carToModified: Array<any> = [];

  constructor(private http: HttpClient, private carService: CarService) { 
  }

  getAll(): Observable<any> {
    return this.http.get(this.OWNER_API);
  }
  getByDni(dni : string) {
    return this.http.get(this.API + '/owner?dni=' + dni)
  }

  get(id : string){ 
    return  this.http.get(this.API + '/owners/' + id);
  }

  save(owner: any): Observable<any> {
    let result: Observable<Object>;
    if (owner['href']) {
      result = this.http.put(owner.href, owner);
    } else {
      result = this.http.post(this.OWNER_API, owner);
    }
    return result;
  }

  remove(href: string) {
    this.http.get(href).subscribe((owner: any) => {
      this.carService.getAll().subscribe(data => {
        data._embedded.cars.map((car => {
          if(car.ownerDni === owner.dni ){
              let updateCar = new Object();
              updateCar['name'] = car.name;
              updateCar['href'] = car._links.self.href;
              updateCar['ownerDni'] = undefined;
              this.carService.save(updateCar).subscribe(result => {
              }, error => console.error(error));
          }
        }));
      });
    });
    return this.http.delete(href);
  }
}
