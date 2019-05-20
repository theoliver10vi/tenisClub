import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Router } from '@angular/router';
import { Users } from '../models/user.model'
import { UsersService } from "../services/users.service";

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  userTypeReturned: number;
  user: Users = {
    name: '',
    password: ''
  }

  updateName (event) {
    console.log(event.target.value);
    this.user.name = event.target.value;
  }

  updatePassword (event) {
    console.log(event.target.value);
    this.user.password = event.target.value;
  }

  loggUser () {
    this.userTypeReturned = this.userService.logUser(this.user);
    console.log(this.userTypeReturned)
    switch (this.userTypeReturned) {
      case 0:
        this.router.navigate(['admin']);
        break;
      case 1:
        this.router.navigate(['arbitro']);
        break;
      case 2:
        this.router.navigate(['jugador',this.user.password]);
        break;

      default:
        break;
    }
    
    this.dialog.closeAll();
    }
  constructor (private dialog: MatDialog, private router: Router, private userService: UsersService) { }

  /*closeDialog() : void {
    const dialogRef = this.dialog.closeAll();

  }
  */
  ngOnInit () {
   // this.loggUser();
  }


}