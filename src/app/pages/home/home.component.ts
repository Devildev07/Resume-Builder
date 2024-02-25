import { Component } from '@angular/core';
import { FeaturesComponent } from "../../components/features/features.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FeaturesComponent]
})
export class HomeComponent {

}
