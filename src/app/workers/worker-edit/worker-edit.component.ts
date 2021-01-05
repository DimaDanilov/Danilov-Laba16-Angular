import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Worker, MyWorkerPlace } from 'src/app/shared/models/worker.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { isNullOrUndefined } from 'util';
import { WorkersService } from 'src/app/shared/services/workers.service';

@Component({
  selector: 'app-worker-edit',
  templateUrl: './worker-edit.component.html',
  styleUrls: ['./worker-edit.component.css'],
})
export class WorkerEditComponent implements OnInit {

  id: number;
  worker: Worker;
  workerForm: FormGroup;
  myWorkerPlace = MyWorkerPlace;


  phoneMask = ' (000) 000-00-00';
  textPattern = { 'R': { pattern: new RegExp('\[а-яА-Яa-zA-Z\]')} };
  phonePattern = /7 \(\d\d\d\) \d\d\d\-\d\d\-\d\d/g;
  emailPattern = /\S+@\S+\.\S+/;

  constructor(
    private activatedRouter: ActivatedRoute,
    private workersService: WorkersService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((param) => {
      this.id = param.id;
    });
  }

  ngOnInit(): void {
    this.workerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      patronymic: new FormControl(null, [Validators.required]),
      phone_number: new FormControl(null, [Validators.required, Validators.pattern(this.phonePattern)]),
      email: new FormControl(null, [Validators.required, Validators.pattern(this.emailPattern)]),
      birthdate: new FormControl(null, [Validators.required]),
      workplace: new FormControl(null, [Validators.required]),
    });
    this.getData();
  }

  async getData() {
    if (!isNullOrUndefined(this.id)) {
      try {
        let worker = this.workersService.getOneById(this.id);
        this.worker = await worker;
      } catch (err) {
        console.error(err);
      }
      this.workerForm.patchValue({
        name: this.worker.name,
        surname: this.worker.surname,
        patronymic: this.worker.patronymic,
        phone_number: this.worker.phone_number,
        email: this.worker.email,
        birthdate: this.worker.birthdate,
        workplace: this.worker.workplace,
      });
    }
  }

  async onSave() {
    if (!isNullOrUndefined(this.id)) {
      try {
        await this.workersService.putOneById(this.id, this.workerForm.value);
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        let res = await this.workersService.postOne(this.workerForm.value);
        this.router.navigate([this.router.url, res.id]);
        this.getData();
      } catch (err) {
        console.error(err);
      }
    }
  }

  async onDelete() {
    try {
      await this.workersService.deleteOneById(this.id);
    } catch (err) {
      console.error(err);
    }
    this.router.navigate(['/workers']);
  }
}
