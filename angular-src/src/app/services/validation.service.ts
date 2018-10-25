import {Injectable} from '@angular/core';

@Injectable()
export class ValidationService {

    constructor() {
    }

    validateRegister(user) {
        if (user.name == undefined || user.email == undefined
            || user.username == undefined || user.password == undefined) {
            return false;
        } else {
            return true;
        }
    }

    validateUsername(user) {

    }
}
