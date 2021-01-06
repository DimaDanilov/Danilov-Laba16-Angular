import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Worker, MyWorkerPlace } from 'src/app/shared/models/worker.model';

@Component({
  selector: 'app-worker-list',
  templateUrl: './worker-list.component.html',
  styleUrls: ['./worker-list.component.css']
})
export class WorkerListComponent implements OnInit {
  workers: Worker[];
  myWorkerPlace: MyWorkerPlace;
  searchStr = '';


  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onAddProfile() {
    this.router.navigate([this.router.url, 'profile']);
  }

}
