import { Component, OnInit } from '@angular/core';
import { Worker } from 'src/app/shared/models/worker.model';
import { WorkersService } from 'src/app/shared/services/workers.service';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css'],
})
export class WorkerListComponent implements OnInit {
  workers: Worker[];

  FindAge(birthday: string): any{
    let timeDiff = Math.abs(Date.now() - Date.parse(birthday));
    console.log(Date.now());
    console.log(Date.parse(birthday));
    let age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    return age;
  }


  constructor(private workersService: WorkersService, private router: Router) {}

  ngOnInit(): void {
    this.getData();
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

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

  async onDelete(id) {
    try {
      await this.workersService.deleteOneById(id);
      this.getData();
    } catch (err) {
      console.error(err);
    }
  }
}
