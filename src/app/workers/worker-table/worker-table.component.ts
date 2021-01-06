import { Component, OnInit, Input } from '@angular/core';
import { Worker } from 'src/app/shared/models/worker.model';
import { WorkersService } from 'src/app/shared/services/workers.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-table',
  templateUrl: './worker-table.component.html',
  styleUrls: ['./worker-table.component.css'],
})
export class WorkerTableComponent implements OnInit {
  workers: Worker[] = [];
  @Input() title_num;
  @Input() title = '';
  @Input() search_str = '';

  FindAge(birthday: string): any{
    let timeDiff = Math.abs(Date.now() - Date.parse(birthday));
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }

  constructor(private workersService: WorkersService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  lastsort=1;
  sortType=0;
  
  LastSortCounter(sortType: number){
    if (sortType==0) {
      if (this.lastsort!=0){
        this.lastsort=0;
      }
      else {
        this.lastsort=1;
      }
      this.sortType=0;
    }
    else {
      if (this.lastsort!=2){
        this.lastsort=2;
      }
      else {
        this.lastsort=3;
      }
      this.sortType=1;
    }
  }


  async getData() {
    try {
      let workers = this.workersService.getAll();
      this.workers = isNullOrUndefined(await workers) ? [] : await workers;
    } catch (err) {
      console.error(err);
    }
  }

  onLinkProfile(id: number) {
    this.router.navigate([this.router.url, 'profile', id]);
  }

  getByType(type: number) {
    return this.workers.filter((worker) => worker.workplace === type);
  }

  async onDelete(id: number) {
    try {
      await this.workersService.deleteOneById(id);
      this.getData();
    } catch (err) {
      console.error(err);
    }
  }
}
