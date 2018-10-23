import {Component, OnInit} from '@angular/core';
import {ValidationService} from '../../services/validation.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

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
            console.log('Fill in all fields');
            return false;
        }

        this.authService.registerUser(user).subscribe(data => {
            if (data.success) {
                console.log('User registered');
                this.router.navigate(['/']);
            } else {
                console.log('User not registered');
                this.router.navigate(['/']);
            }
        });
    }

}
