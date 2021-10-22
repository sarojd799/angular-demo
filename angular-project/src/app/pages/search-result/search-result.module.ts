import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CommonComponentsModule } from '../components/components.module';
import { ContainerComponent } from '../container/container.component';
import { SearchResultComponent } from './search-result.component';


const routes: Routes = [
    {
        path: 'home', component: ContainerComponent, children: [
            { path: 'searchUsers', component: SearchResultComponent }
        ]
    }
]

@NgModule({
    declarations: [
        SearchResultComponent,
    ],
    imports: [
        CommonComponentsModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    exports: []
})
export class SearchResultModule { }
