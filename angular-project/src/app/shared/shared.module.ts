import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipes/filter.pipe';

import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilterPipe
  ],
  imports: [],
  exports: [
    CommonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
