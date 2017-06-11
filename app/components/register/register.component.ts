import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthenticateService} from '../../services/authenticate.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage:FlashMessagesService,
    private authenticateService: AuthenticateService,
    private router: Router) { }

  ngOnInit() {
  }

   onRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    if(!this.validateService.validateRegister(user)){
      this.flashMessage.show('Fill in all the input fields!', {cssClass: 'alert-danger', timeout:4000});
      return false;
    }

     if(!this.validateService.validateEmail(user.email)){
      this.flashMessage.show('Fill in a valid email adress!', {cssClass: 'alert-danger', timeout:4000});
      return false;
    }

    //User registration
    this.authenticateService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Succesfuly registered new user! Please log in for further use!', {cssClass: 'alert-success', timeout:5000});
        this.router.navigate(['/login']);
      }else{
        this.flashMessage.show('Unabe to register new user! PLease try again!', {cssClass: 'alert-danger', timeout:5000});
        this.router.navigate(['/register']);
      }
    });

  }


}
