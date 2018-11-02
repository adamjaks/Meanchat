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
        M.toast({html: `<i class="material-icons">check</i> Logged out`, classes: 'white deep-orange-text' });
        this.router.navigate(['/']);
    }

}
