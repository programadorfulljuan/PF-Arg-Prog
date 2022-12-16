import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SidebarAnimation } from 'src/app/animations/sidebar.animations';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [SidebarAnimation],
})
export class LoginComponent {
  @Input() collapsed: boolean = false;
  @ViewChild('loginModal') myModal: any;
  @ViewChild('closeModal') closeModal: any;
  loading: boolean = false
  loginForm!: FormGroup;
  onLogin: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.authService.isLoggedIn().subscribe(res => {
    this.onLogin = res;
  }
  );
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  get Username() {
    return this.loginForm.get('username');
  }

  get Password() {
    return this.loginForm.get('password');
  }

  login(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.authService.onLoading.next(true)
      this.toastr.success('Iniciando Sesion', 'Login');
      let cred = JSON.stringify(this.loginForm.value);
      this.authService.login(cred).subscribe(() => {
        this.authService.onLoading.next(false)
        console.log("session iniciada");
        this.toastr.success('Sesion Iniciada', 'Login');
        this.closeModal.nativeElement.click();
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.authService.onLoading.next(false)
      this.toastr.error('Por favor verifique los campos', 'Error');
      console.log('Form is not valid');
    }
  }

  logout() {
    this.router.navigate(['/home']);
    this.authService.logout();
  }
}
