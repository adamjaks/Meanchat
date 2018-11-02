import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

declare var M: any;

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
                M.toast({html: `<i class="material-icons">check</i> ${data.msg}`, classes: 'white deep-orange-text' });
                this.router.navigate(['']);
            } else {
                M.toast({html: `<i class="material-icons">close</i> ${data.msg}`, classes: 'grey'});
            }
        });
    }
}
