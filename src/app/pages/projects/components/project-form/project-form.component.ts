import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Project } from 'src/app/models/projects.interface';

import { ImageService } from 'src/app/services/data-services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss'],
})
export class ProjectFormComponent implements OnInit {
  @Output() dataChange = new EventEmitter<Project>();
  @Output() cancelEdit = new EventEmitter<void>();
  @Input() data: Project = {
    id: 0,
    name: '',
    date: new Date(),
    frontUrl: '',
    backUrl: '',
    demoUrl: '',
    description: '',
    image: '',
  };
  file: any;
  preview: string = '';
  form!: FormGroup;
  imgName: string = '';
  API_URL = environment.API_URL;

  constructor(private fb: FormBuilder, private imgService: ImageService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      date: ['', Validators.required],
      frontUrl: ['', Validators.required],
      backUrl: ['', Validators.required],
      demoUrl: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.imgName = this.data.image;
  }

  onFileChange(event: Event): any {
    const target = event.target as HTMLInputElement;
    const file = target.files?.length ? target.files[0] : null;
    if (file) {
      this.file = file;
      this.imgService.getBase64(file).then((base64) => {
        this.preview = base64;
      });
    } else {
      this.file = null;
    }
  }

  uploadImage(): void {
    const file = new FormData();
    file.append('file', this.file, this.file.name);
    this.imgService.postImage(file).subscribe((res: any) => {
      console.log(res);
    });
  }

  onSubmit(event: Event): void {
    try {
      event.preventDefault();
      this.data = this.form.value;
      this.file !== undefined
        ? (this.data.image = this.file.name) && this.uploadImage()
        : (this.data.image = this.imgName);
      this.dataChange.emit(this.data);
      this.form.reset();
      this.preview = '';
    } catch (error) {
      console.log(error);
    }
  }
}
