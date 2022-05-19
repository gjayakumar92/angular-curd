import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { FirebaseService } from '../core/firebase.service';

@Injectable()
export class EditUserResolver implements Resolve<any> {

  constructor(
    public firebaseService: FirebaseService
  ) { }

  resolve(route: ActivatedRouteSnapshot,) {

    return new Promise((resolve, reject) => {
      let personId = route.paramMap.get('id');
      this.firebaseService.getPerson(personId)
        .then(data => {
          data.id = personId;
          resolve({
            person: data
          })
        });
    })
  }
}
