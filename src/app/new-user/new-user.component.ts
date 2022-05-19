import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AvatarDialogComponent } from "../avatar-dialog/avatar-dialog.component";
import { FirebaseService } from '../core/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  exampleForm!: FormGroup;
  avatarLink: string = "https://randomuser.me/api/portraits/men/87.jpg";

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.exampleForm = this.fb.group({
      name: ['', Validators.required ],
      surname: ['', Validators.required ],
      email: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      gender: ['', Validators.required],
      pincode: ['', Validators.required],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AvatarDialogComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.avatarLink = result.link;
    });
  }

  resetFields(){
    this.avatarLink = "https://randomuser.me/api/portraits/men/87.jpg";
    this.exampleForm = this.fb.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobileNumber: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      pincode: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(value: any){
    this.firebaseService.createPerson(value,this.avatarLink)
    .then(
      res => {
        this.resetFields();
        this.router.navigate(['/']);
      }
    )
  }

  back(){
    this.router.navigate(['/']);
  }
}
