import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-conseil-en-cours',
  templateUrl: './conseil-en-cours.component.html',
  styleUrls: ['./conseil-en-cours.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule]
})
export class ConseilEnCoursComponent {

}
