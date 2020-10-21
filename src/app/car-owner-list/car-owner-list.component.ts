import { Component, OnInit } from '@angular/core';
import { CarService } from '../shared/car/car.service';
import { GiphyService } from '../shared/giphy/giphy.service';
import { OwnerService } from '../shared/owner/owner.service';

@Component({
  selector: 'app-car-owner-list',
  templateUrl: './car-owner-list.component.html',
  styleUrls: ['./car-owner-list.component.css']
})
export class CarOwnerListComponent implements OnInit {
  cars: Array<any>;
  owners: Array<any>;
  carOwners: Array<any> = [];

  constructor(private carService: CarService, private giphyService: GiphyService, private ownerService: OwnerService) { }

  ngOnInit() {
    this.ownerService.getAll().subscribe(data => {
      this.owners = data._embedded.owners;
    });

    this.carService.getAll().subscribe(data => {
      this.cars = data._embedded.cars;
      for (const car of this.cars) {
        if(car.ownerDni !== null){
          this.ownerService.getByDni(car.ownerDni).subscribe((owner: any) => {
            const car_name = car.name;
            let owner_name = 'No Se encontro';
            if (owner[0] !== undefined){
              owner_name = owner[0].name;
            }
            const href: Array<any> = car._links.self.href.split('/');
            car.id = href[href.length - 1];
            this.giphyService.get(car.name).subscribe(url => {
              
              this.carOwners.push({
                "owner_name": owner_name,
                "car_id": car.id,
                "owner_dni": car.ownerDni,
                "car_name": car_name,
                "giphyUrl": url
              });
            });      
          });
        }
      }
    });
  }
}
