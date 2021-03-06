import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../shared/users.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'create-join',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './create-join.component.html',
  styleUrls: ['./create-join.component.css']
})

export class CreateJoinComponent {

  name: string;
  public uname: string;
  constructor(
    private router: Router,
    public usersService: UsersService) {

  }

  ngOnInit() {
    if (this.usersService != undefined && this.usersService.currentUser != undefined)
      this.uname = this.usersService.currentUser.username;
  }

  gotoJoinHub(name:string) {
    this.name = name;
    if(0==name.length)
    {
      confirm("Please enter a proper value");
      return;
    }
    if(name.indexOf(' ') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf('[') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf(']') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf('.') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf('$') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf('/') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf('|') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf('\t') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf('?') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if(name.indexOf('.') != -1) {
      confirm("Nickname cannot use certain special characters ( . , ? | / [ ] )");
      return;
    }
    if (this.name.length) {
      this.usersService.updateUsername(this.usersService.currentUser.uid, this.name);
    }
    else {
      this.usersService.updateUsername(this.usersService.currentUser.uid,this.usersService.currentUser.email);
    }
    this.router.navigate(['join-hub']);
  }

  gotoCreateHub(name:string) {
    this.name = name;
    if(name.indexOf(' ') != -1) {
      return;
    }
    if (this.name) {
      this.usersService.updateUsername(this.usersService.currentUser.uid, this.name);
    }
    else {
      this.usersService.updateUsername(this.usersService.currentUser.uid,this.usersService.currentUser.email);
    }
    this.router.navigate(['create-hub']);
  }
}
