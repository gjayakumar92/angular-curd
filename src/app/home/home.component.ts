import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  ageValue!: number;
  searchValue: string = "";
  items: Array<any> = [];
  name_filtered_items: Array<any> = [];

  constructor(
    public firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.ageValue = 18;
    this.getData();
  }

  getData() {
    this.firebaseService.getPeople()
      .then(res => {
        console.log(res)
        this.items = res;
        console.log(this.items)
        this.name_filtered_items = res;
      })
  }

  viewDetails(item: any) {
    this.router.navigate(['/details/' + item.payload.doc.id])
  }

  goToCreatePerson() {
    this.router.navigate(['/new']);
  }

  capitalizeFirstLetter(value: any) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  searchByName() {
    let value = this.searchValue.toLowerCase();
    this.firebaseService.searchPeople(value)
      .then(res => {
        this.name_filtered_items = res;
        this.items = res;
      })
  }
}
