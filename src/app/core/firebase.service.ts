import { Injectable } from "@angular/core";
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable()
export class FirebaseService {

  constructor(
    public afs: AngularFirestore
  ) {

  }

  getPeople() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/people').snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots)
        })
    })
  }

  searchPeople(searchValue: any) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('people', ref => ref.where('nameToSearch', '>=', searchValue)
        .where('nameToSearch', '<=', searchValue + '\uf8ff'))
        .snapshotChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    })
  }

  createPerson(value: any, avatar: any) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/people').add({
        name: value.name,
        nameToSearch: value.name.toLowerCase(),
        surname: value.surname,
        avatar: avatar
      })
        .then(
          (res) => {
            resolve(res)
          },
          err => reject(err)
        )
    })
  }
  
  getAvatars() {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/avatar').valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    });
  }

  getPerson(personKey: any) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('people').doc(personKey)
        .valueChanges()
        .subscribe(snapshots => {
          resolve(snapshots);
        })
    })
  }

  updatePerson(personKey: any, value: any) {
    return new Promise<any>((resolve, reject) => {
      value.nameToSearch = value.name.toLowerCase();
      this.afs.collection('/people').doc(personKey).set(value)
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err);
          })
    })
  }

  deletePerson(personKey: any) {
    return new Promise<any>((resolve, reject) => {
      this.afs.collection('/people').doc(personKey).delete()
        .then(
          res => {
            resolve(res);
          },
          err => {
            reject(err)
          })
    })
  }
}
