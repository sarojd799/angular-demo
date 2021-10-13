import { Component, OnInit } from '@angular/core';
import { StudentType } from 'src/app/types/common.types';

const studentList: StudentType[] = [
  { firstName: 'Saroj', middleName: 'Kumar', lastName: 'Dash', gender: 'M', email: 'saroj@gmail.com', phone: '7008707322' },
  { firstName: 'Bikram', middleName: 'Keshari', lastName: 'Jena', gender: 'M', email: 'bikram@gmail.com', phone: '7008707322' },
  { firstName: 'Devraj', middleName: null, lastName: 'Jena', gender: 'M', email: 'dev@gmail.com', phone: '7008707322' },
  { firstName: 'Pranav', middleName: null, lastName: 'Ghosh', gender: 'M', email: 'pranav@gmail.com', phone: '7008707322' },
  { firstName: 'Chinmay', middleName: null, lastName: 'Panda', gender: 'M', email: 'chinmay@gmail.com', phone: '7008707322' }
]

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  displayedColumns: string[] = ['slno', 'name', 'gender', 'email', 'phone', 'action'];
  dataSource = studentList;

  constructor() { }

  ngOnInit(): void { }

}
