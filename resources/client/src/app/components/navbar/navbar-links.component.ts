import { Component } from '@angular/core';

@Component({
    selector: 'app-navbar-links',
    templateUrl: './navbar-links.component.html',
    styleUrls: ['./navbar-links.component.scss'],
})
export class NavbarLinksComponent {

    public config: IConfig[] = [
        {
            link: '/home',
            icon: 'home',
            text: 'Home',
        },
        {
            link: '/products',
            icon: 'roller_skating',
            text: 'Products',
        },
    ]
}

interface IConfig {
    link: string,
    icon: string,
    text: string,
}
