import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormControl, Validators, UntypedFormGroup, FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm!: FormGroup;
    loading!: boolean;
    hideNewPassword: boolean;

    constructor(private router: Router,
        private titleService: Title,
        private notificationService: NotificationService,
        private authenticationService: AuthenticationService) {
            this.hideNewPassword = true;
    }

    ngOnInit() {
        this.titleService.setTitle('Login');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        //const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new FormGroup({
            userName: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),
          
          });
    }

    login() {
        const userName = this.loginForm.get('userName')?.value;
        const password = this.loginForm.get('password')?.value;
       // const rememberMe = this.loginForm.get('rememberMe')?.value;

        console.log(userName+" "+ password)
        this.loading = true;
        this.authenticationService
            .login(userName.toLowerCase(), password)
            .subscribe({
               next: data => {
                    this.authenticationService.setToken(data.token)
                    this.router.navigate(['/']);
                },
               error: error => {
                    this.notificationService.openSnackBar("Credenciales Invalidas - intente Nuevamente");
                    this.loading = false;
                }
            }
            );
    }

    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
