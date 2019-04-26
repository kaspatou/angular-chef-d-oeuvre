import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {LoginService} from '../../service/login.service';
import {User} from '../../model/user.model';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent  {

  loginForm = this.fb.group({
    username: [null, Validators.required],
    password: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(255)])
    ]
  });

  constructor(private fb: FormBuilder, private loginService: LoginService) {}

  onSubmit() {
    const user = new User();
    user.username = this.loginForm.value.username;
    user.password = this.loginForm.value.password;
    this.loginService.signIn(user);
  }

  onSubscribe() {

  }
}
