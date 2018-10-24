import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    username: String;
    password: String;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
    }

    onLoginSubmit() {
        const user = {
          username: this.username,
          password: this.password
        };

        this.authService.authenticateUser(user).subscribe(data => {
            if (data.success) {
                this.authService.storeUserData(data.token, data.user);
                this.router.navigate(['']);
                console.log(`Logged as ${data.user.username}`)
            } else {
                console.log('Not logged in');
            }
        });
    }
}