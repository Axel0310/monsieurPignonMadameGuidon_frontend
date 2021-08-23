import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { shareReplay } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private auth: AuthenticationService, private http: HttpClient) {}

  signinForm = new FormGroup({
    identifier: new FormControl('Toulouse_Shop', Validators.required),
    password: new FormControl('pass', Validators.required),
  });

  onSubmit() {
    this.auth
      .signin(this.signinForm.value.identifier, this.signinForm.value.password)
      .pipe(shareReplay())
      .subscribe();
  }
}
