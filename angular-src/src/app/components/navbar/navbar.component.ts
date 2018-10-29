import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

declare var M: any;

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {

    }

    onLogoutClick() {
        this.authService.logout();
        M.toast({html: 'Logged out', classes: 'deep-orange' });
        this.router.navigate(['/']);
    }

}
