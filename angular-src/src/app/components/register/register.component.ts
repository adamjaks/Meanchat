import {Component, OnInit} from '@angular/core';
import {ValidationService} from '../../services/validation.service';

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

    constructor(private validationService: ValidationService) {
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
            console.log("Fill in all fields");
            return false;
        }
    }

}
