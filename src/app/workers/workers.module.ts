import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkersRoutingModule } from './workers-routing.module';
import { WorkersComponent } from './workers.component';
import { WorkerEditComponent } from './worker-edit/worker-edit.component';
import { WorkerListComponent } from './worker-list/worker-list.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { WorkerTableComponent } from './worker-table/worker-table.component';
import { SearchFilterPipe} from '../shared/pipes/search-filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WorkersComponent, WorkerEditComponent, WorkerListComponent, WorkerTableComponent, SearchFilterPipe],
  imports: [
    CommonModule, 
    WorkersRoutingModule, 
    ReactiveFormsModule, 
    NgxMaskModule.forRoot(),
    FormsModule
  ],
})
export class WorkersModule {}
