import { Component,OnInit } from '@angular/core';
import { Utilisateur } from '../utilisateur/utilisateur';
import { HttpClient } from '@angular/common/http';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

 sessionData: any = null;
isModalOpen = false;

  newUser: Utilisateur = {
    id: 0,
    username: '',
    password: '',
    email: '',
    role: '',

    poste: '',
    Secteur: ''
  };
  roles = [
    'enseignant',
    'president jury',
    'rapporteur',
    'chef departement'
  ];

  secteurs = [
    'Informatique',
    'Mathématique',
    'Telecommunication',
    'ML',
    'GC'
  ];
  constructor(private http: HttpClient,private authservice:UtilisateurService,private router: Router) {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeOnOutsideClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.closeModal();
    }
  }

  signupErrors: any = {};

  resetErrors() {
    this.signupErrors = {};
  }
 onRegister(): void {
  if (!this.validateSignup()) {
    return; // formulaire invalide => on ne continue pas
  }

  console.log('User Data:', this.newUser);
  this.authservice.register(this.newUser).subscribe({
    next: (response) => {
      console.log('User registered successfully', response);
      alert('Registration successful');
      this.router.navigate(['/login']);
    },
    error: (error) => {
      console.error('Registration failed:', error);
      alert('Registration failed');
    }
  });
}



  validateSignup(): boolean {
    this.resetErrors();
    let isValid = true;

    // Username
    if (!this.newUser.username || this.newUser.username.trim().length === 0) {
      this.signupErrors.username = 'Nom utilisateur est requis';
      isValid = false;
    } else if (this.newUser.username.length < 3) {
      this.signupErrors.username = 'Le nom utilisateur doit contenir au moins 3 caractères';
      isValid = false;
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.newUser.email) {
      this.signupErrors.email = 'Email est requis';
      isValid = false;
    } else if (!emailPattern.test(this.newUser.email)) {
      this.signupErrors.email = "Le format de l'email est invalide";
      isValid = false;
    }

    // Password
    if (!this.newUser.password) {
      this.signupErrors.password = 'Mot de passe est requis';
      isValid = false;
    } else if (this.newUser.password.length < 6) {
      this.signupErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
      isValid = false;
    }

    // Role
    if (!this.newUser.role || this.newUser.role.trim().length === 0) {
      this.signupErrors.role = 'Veuillez sélectionner un rôle';
      isValid = false;
    } else if (!this.roles.includes(this.newUser.role)) {
      this.signupErrors.role = 'Rôle invalide';
      isValid = false;
    }

    // Secteur
    if (!this.newUser.Secteur || this.newUser.Secteur.trim().length === 0) {
      this.signupErrors.Secteur = 'Veuillez sélectionner un secteur';
      isValid = false;
    } else if (!this.secteurs.includes(this.newUser.Secteur)) {
      this.signupErrors.Secteur = 'Secteur invalide';
      isValid = false;
    }

    

    return isValid;
  }

  submitForm() {
    if (this.validateSignup()) {
      // Ici vous pouvez envoyer newUser au backend ou autre traitement
      console.log('Formulaire valide', this.newUser);
    } else {
      console.log('Formulaire invalide', this.signupErrors);
    }
  }
  ngOnInit(): void {
    this.sessionData = {
      token: sessionStorage.getItem('token'),
      username: sessionStorage.getItem('username'),
      id: sessionStorage.getItem('id'),
      role: sessionStorage.getItem('role')
    };
  }

  


  

}
