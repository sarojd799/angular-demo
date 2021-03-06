import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { CommonComponentsModule } from '../components/components.module';
import { ContainerComponent } from '../container/container.component';
import { ChatComponent } from './chat.component';
import { ChatScreenLeftSectionComponent } from './left-menu/chat-screen-left-section.component';
import { ChatScreenRightSectionComponent } from './right-section/chat-screen-right-section.component';


const routes: Routes = [
    {
        path: 'home', component: ContainerComponent, children: [
            { path: 'chat', component: ChatComponent, data: { animation: 'isRight' } }
        ]
    }
]

@NgModule({
    declarations: [
        ChatComponent,
        ChatScreenLeftSectionComponent,
        ChatScreenRightSectionComponent
    ],
    imports: [
        SharedModule,
        CommonComponentsModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
    exports: []
})
export class ChatModule { }
