import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { FirebaseService } from '../core/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  exampleForm!: FormGroup;
  avatarLink: string = '';
  item: any;

  constructor(
    public firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.item = data.person;
        this.avatarLink = data.person.avatar;
        this.createForm();
      }
    })
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: [this.item.name, Validators.required],
      surname: [this.item.surname, Validators.required],
      email: [this.item.email, Validators.required],
      mobileNumber: [this.item.mobileNumber, Validators.required],
      gender: [this.item.gender, Validators.required],
      pincode: [this.item.pincode, Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
    });

    dialogRef.afterClosed().subscribe((result: { link: string; }) => {
      console.log(result);
      this.avatarLink = result.link;
    });
  }

  onSubmit(value: any) {
    value.avatar = this.avatarLink;
    this.firebaseService.updatePerson(this.item.id, value)
      .then(
        res => {
          console.log(res);
          this.router.navigate(['/']);
        }
      )
  }

  delete() {
    this.firebaseService.deletePerson(this.item.id)
      .then(
        res => {
          this.router.navigate(['/']);
        },
        err => {
          console.log(err);
        }
      )
  }

  back() {
    this.router.navigate(['/']);
  }

}
