import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../core/firebase.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-avatar-dialog',
  templateUrl: './avatar-dialog.component.html',
  styleUrls: ['./avatar-dialog.component.scss']
})
export class AvatarDialogComponent implements OnInit {

  avatars: Array<any> = new Array<any>();

  constructor(
    public dialogRef: MatDialogRef<AvatarDialogComponent>,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getAvatars()
    .then(data => {
      this.avatars = data;
      console.log(this.avatars)
    })
  }

  close(avatar: any){
    this.dialogRef.close(avatar)
  }

}
