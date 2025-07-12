import { Component, OnInit } from '@angular/core';
import { Rectification, RectificationService } from './rectification.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-rectification',
    templateUrl: './rectification.component.html',
    styleUrls: ['./rectification.component.css'],
    standalone: false
})
export class RectificationComponent implements OnInit {
  rectifications: Rectification[] = [];
  formData: Rectification = {
    etudiantNom: '',
    classe: '',
    option: '',
    ancienneNote: 0,
    nouvelleNote: 0,
    justification: ''
  };

  constructor(
    private rectificationService: RectificationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.rectificationService.getAll().subscribe(data => {
      this.rectifications = data;
    });
  }

  submit() {
    this.rectificationService.create(this.formData).subscribe(() => {
      this.formData = {
        etudiantNom: '',
        classe: '',
        option: '',
        ancienneNote: 0,
        nouvelleNote: 0,
        justification: ''
      };
      this.loadAll();
    });
  }
}

