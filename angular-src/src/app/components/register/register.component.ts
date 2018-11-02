import {Component, OnInit} from '@angular/core';
import {ValidationService} from '../../services/validation.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

declare var M: any;

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    name: String;
    username: String;
    email: String;
    password: String;

    constructor(private validationService: ValidationService, private authService: AuthService,
                private router: Router) {
    }

    ngOnInit() {
    }

    onRegisterSubmit() {
        const user = {
            name: this.name,
            email: this.email,
            username: this.username,
            password: this.password
        };

        if (!this.validationService.validateRegister(user)) {
            M.toast({html: `<i class="material-icons">close</i> All fields must be filled`, classes: 'grey'});
            return false;
        }

        this.authService.registerUser(user).subscribe(data => {
            if (data.success) {
                M.toast({html: `<i class="material-icons">check</i> ${data.msg}`, classes: 'white deep-orange-text' });
                this.router.navigate(['/login']);
            } else {
                M.toast({html: `<i class="material-icons">close</i> ${data.msg}`, classes: 'grey'});
            }
        });
    }

}
