import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authservice: AuthService){

  }
  ngOnInit(){

    this.authservice.autoAuthUser();
    AOS.init({
            offset: 400,
            duration: 1000
          });
  }
}
