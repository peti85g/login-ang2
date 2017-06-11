import { Component, OnInit } from '@angular/core';
import {AuthenticateService} from '../../services/authenticate.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authenticateService: AuthenticateService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this.authenticateService.logout();
    this.flashMessage.show('You have succesfuly logged out!', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['login']);
  }

}