import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { WorkerEditComponent } from './worker-edit/worker-edit.component';
import { WorkerListComponent } from './worker-list/worker-list.component';

@NgModule({
  declarations: [WorkersComponent, WorkerEditComponent, WorkerListComponent],
  imports: [CommonModule, WorkersRoutingModule, ReactiveFormsModule],
})
export class WorkersModule {}