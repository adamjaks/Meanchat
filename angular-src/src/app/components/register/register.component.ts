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
            M.toast({html: 'All fields must be filled'});
            return false;
        }

        this.authService.registerUser(user).subscribe(data => {
            if (data.success) {
                M.toast({html: data.msg, classes: 'deep-orange' });
                this.router.navigate(['/login']);
            } else {
                M.toast({ html: data.msg });
            }
        });
    }

}
