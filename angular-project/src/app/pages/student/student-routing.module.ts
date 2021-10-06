import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateStudentComponent } from "./create-student/create-student.component";
import { StudentListComponent } from "./student-list/student-list.component";

const appRoutes: Routes = [
    {
        path: 'student', children: [
            { path: '', component: StudentListComponent },
            { path: 'create', component: CreateStudentComponent }
        ]
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(appRoutes)
    ]
})
export class StudentRoutingModule { }