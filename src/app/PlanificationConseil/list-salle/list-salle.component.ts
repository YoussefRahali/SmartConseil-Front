import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ConseilService } from '../conseil.service';
import { Salle } from '../salle/Salle';

@Component({
  selector: 'app-list-salle',
  templateUrl: './list-salle.component.html',
  styleUrls: ['./list-salle.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule]
})
export class ListSalleComponent implements OnInit {
  constructor(private formBuilder: FormBuilder,HttpClient:HttpClientModule,private conseilService:ConseilService,private router: Router ) { }
  Salles:Salle[]=[]
  ngOnInit(): void {
      this.GetAllSalle();

  }

  GetAllSalle(){
    console.log('🏢 Loading salles...');
    this.conseilService.getSalles().subscribe({
      next: (data) => {
        console.log('✅ Salles loaded:', data);
        console.log('Number of salles:', data.length);
        this.Salles = data;
      },
      error: (error) => {
        console.error('❌ Error loading salles:', error);
      }
    });
  }
}
