import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule, HttpClientModule],
  providers: [AuthService],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  cookie = document.cookie;
  constructor(private authService: AuthService, private router: Router) {
  }
  signup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  register() {
    this.authService.resgister(this.signup.getRawValue()).subscribe( res => {
      if(res.id) {
        localStorage.setItem('userId', res.id);
        this.router.navigate(['/']);
      }
    })
  }
}
