import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    // Initialize the form with the role field
    this.loginForm = this.fb.group({
      role: ['', Validators.required]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const role = this.loginForm.get('role')?.value;

      // Navigate based on the selected role
      if (role === 'seller') {
        this.router.navigate(['/seller-dashboard']);
        this.toastr.success('Successfully logged in!', 'Login');
      } else if (role === 'bidder') {
        this.router.navigate(['/bidder-dashboard']);
        this.toastr.success('Successfully logged in!', 'Login');
      }
    }
  }

}
