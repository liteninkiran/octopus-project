import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.scss'],
})
export class ProductViewComponent {

    public id: string = '';

    constructor(
        private route: ActivatedRoute,
    ) {

    }

    public ngOnInit(): void {
        this.setId();
    }

    private setId(): void {
        this.route.paramMap.subscribe(params => {
            this.id = params.get('id') as string;
        });
    }

}
