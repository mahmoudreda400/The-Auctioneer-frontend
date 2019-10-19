import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { AppUser } from 'shared/models/app-user';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { Observable } from 'rxjs';
import { ShoppingCart } from 'shared/models/shopping-cart';

import {environment } from 'environments/environment';
import {Http} from '@angular/http';
import { Router } from '@angular/router';

var modal = document.getElementById("loginModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  appUser: any;
  user :any = {
  };
  cart$: Observable<ShoppingCart>;
loginShow;
  constructor(private http:Http,
    private router:Router,private auth: AuthService, private shoppingCartService: ShoppingCartService) {
    this.loginShow = false;
   }
   login(){
    var modal = document.getElementById("loginModal");
    modal.style.display = "block";
   }

signUp(user){
  user.createdDate = + new Date();
  alert('Under Construction');
  // this.http.post(environment.url + 'user/add',user ).subscribe(response => {
  //     this.loginShow = true;
  //   })
}
loginUser(user){
if (user.email == 'admin' && user.password == 'admin')
{
  this.appUser = {
    "id": 58,
    "firstName": "Ahmed",
    "lastName": "Fares",
    "email": "ahmed.fares101@gmail.com",
    "address": null,
    "mobile": null,
    "whatsapp": null,
    "active": null,
    "blocked": null,
    "password": "123",
    "seller": null,
    "buyer": null,
    "token": "8a474b4a-46e5-4de1-bfb8-6d84d3da7fcc",
    "createdDate": null,
    "admin": true
  };
  var modal = document.getElementById("loginModal");
  modal.style.display = "none";
  sessionStorage.setItem('userLoggedIn',JSON.stringify(this.appUser));
}
else if (user.email == 'user' && user.password == 'user')
{
  this.appUser = {
    "id": 58,
    "firstName": "Mustafa",
    "lastName": "Anwar",
    "email": "ahmed.fares90@gmail.com",
    "address": null,
    "mobile": null,
    "whatsapp": null,
    "active": null,
    "blocked": null,
    "password": "123", 
    "seller": null,
    "buyer": null,
    "token": "8a474b4a-46e5-4de1-bfb8-6d84d3da7fcc",
    "createdDate": null,
    "admin": false
  };
  var modal = document.getElementById("loginModal");
  modal.style.display = "none";
  sessionStorage.setItem('userLoggedIn',JSON.stringify(this.appUser));
}

  // this.http.post(environment.url + 'auth/login',user ).subscribe(response => {
  //   this.appUser = response.json();
  //     var modal = document.getElementById("loginModal");
  //   modal.style.display = "none";
  //   })
}
   closeModal(){
    var modal = document.getElementById("loginModal");
    modal.style.display = "none";
   }
   toggle(){
    this.loginShow = !this.loginShow;
   }
   logout(){
    this.appUser = null;
    sessionStorage.setItem('userLoggedIn',null);
    //this.auth.logout();
  }
  async ngOnInit(){
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.auth.user$.subscribe(appUser => this.appUser = appUser);
    
    this.cart$ = (await this.shoppingCartService.getCart());

  }
}
