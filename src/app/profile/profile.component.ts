import { Component, OnInit } from '@angular/core';
import { AuthService, User } from '../services/auth.service';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { Router } from '@angular/router';

export interface ProfileUpdateRequest {
  username: string;
  poste: string;
  secteur: string;
  email: string;
  phoneNumber: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone: false
})
export class ProfileComponent implements OnInit {
  currentUser: User | null = null;
  profileData: ProfileUpdateRequest = {
    username: '',
    poste: '',
    secteur: '',
    email: '',
    phoneNumber: ''
  };

  passwordData: PasswordChangeRequest = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  isEditing = false;
  isChangingPassword = false;
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  
  // Available options for dropdowns
  secteurs = [
    'Informatique',
    'Mathématique',
    'Telecommunication',
    'ML',
    'GC',
    'Administration'
  ];
  
  postes = [
    'Professeur',
    'Maître de Conférences',
    'Professeur Associé',
    'Chef de Département',
    'Directeur',
    'Rapporteur',
    'Enseignant',
    'Assistant'
  ];

  constructor(
    private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.loadUserProfile();
      } else {
        this.router.navigate(['/utilisateur']);
      }
    });
  }

  loadUserProfile(): void {
    if (!this.currentUser) return;

    this.isLoading = true;

    // Try to load profile from backend, but fallback to current user data if restricted
    this.utilisateurService.getUserProfile(this.currentUser.email).subscribe({
      next: (profile) => {
        this.profileData = {
          username: profile.username || '',
          poste: profile.poste || '',
          secteur: profile.secteur || '',
          email: profile.email || '',
          phoneNumber: profile.phoneNumber || ''
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading profile (using fallback):', error);
        // If profile endpoint fails (due to role restrictions), use current user data
        // This is a temporary workaround until backend is updated to allow all roles
        this.profileData = {
          username: this.currentUser?.username || '',
          poste: this.getDefaultPosteForRole(this.currentUser?.role || ''),
          secteur: 'Informatique', // Default sector
          email: this.currentUser?.email || '',
          phoneNumber: this.currentUser?.phoneNumber || ''
        };
        this.isLoading = false;
      }
    });
  }

  private getDefaultPosteForRole(role: string): string {
    switch (role.toLowerCase()) {
      case 'enseignant':
        return 'Professeur';
      case 'chef departement':
        return 'Chef de Département';
      case 'rapporteur':
        return 'Rapporteur';
      case 'president jury':
        return 'Président de Jury';
      default:
        return 'Enseignant';
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    this.clearMessages();
    
    if (!this.isEditing) {
      // Reset form when canceling edit
      this.loadUserProfile();
    }
  }

  saveProfile(): void {
    if (!this.validateProfileForm()) {
      return;
    }

    this.isLoading = true;
    this.clearMessages();

    this.utilisateurService.updateProfile(this.profileData).subscribe({
      next: () => {
        this.successMessage = 'Profil mis à jour avec succès!';
        this.isEditing = false;
        this.isLoading = false;

        // Update current user data in auth service if needed
        if (this.currentUser) {
          this.currentUser.username = this.profileData.username;
          this.currentUser.phoneNumber = this.profileData.phoneNumber;
        }

        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      },
      error: (error) => {
        console.error('Error updating profile:', error);
        this.errorMessage = 'Erreur lors de la mise à jour du profil. Veuillez réessayer.';
        this.isLoading = false;

        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }

  private validateProfileForm(): boolean {
    this.clearMessages();

    if (!this.profileData.username || this.profileData.username.trim().length === 0) {
      this.errorMessage = 'Le nom d\'utilisateur est requis.';
      return false;
    }

    if (!this.profileData.phoneNumber || this.profileData.phoneNumber.trim().length === 0) {
      this.errorMessage = 'Le numéro de téléphone est requis.';
      return false;
    }

    // Basic phone number validation
    const phonePattern = /^(\+216\s?)?[0-9\s\-]{8,15}$/;
    if (!phonePattern.test(this.profileData.phoneNumber)) {
      this.errorMessage = 'Format de numéro de téléphone invalide. Utilisez le format: +216 XX XXX XXX';
      return false;
    }

    return true;
  }



  clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }

  togglePasswordChange(): void {
    this.isChangingPassword = !this.isChangingPassword;
    this.clearMessages();

    if (!this.isChangingPassword) {
      // Reset password form when canceling
      this.passwordData = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      };
    }
  }

  cancelPasswordChange(): void {
    this.isChangingPassword = false;
    this.passwordData = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
    this.clearMessages();
  }

  isPasswordValid(): boolean {
    return !!(
      this.passwordData.currentPassword &&
      this.passwordData.newPassword &&
      this.passwordData.confirmPassword &&
      this.passwordData.newPassword === this.passwordData.confirmPassword &&
      this.passwordData.newPassword.length >= 6
    );
  }

  changePassword(): void {
    if (!this.isPasswordValid()) {
      this.errorMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }

    console.log('Attempting to change password with data:', {
      currentPassword: this.passwordData.currentPassword ? '***' : 'empty',
      newPassword: this.passwordData.newPassword ? '***' : 'empty',
      confirmPassword: this.passwordData.confirmPassword ? '***' : 'empty'
    });

    this.isLoading = true;
    this.clearMessages();

    this.utilisateurService.changePassword(this.passwordData).subscribe({
      next: () => {
        this.successMessage = 'Mot de passe changé avec succès!';
        this.isChangingPassword = false;
        this.isLoading = false;

        // Reset password form
        this.passwordData = {
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        };

        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Error changing password:', error);
        console.error('Error details:', {
          status: error.status,
          statusText: error.statusText,
          message: error.message,
          error: error.error
        });

        if (error.status === 400) {
          // Handle specific error messages from backend
          if (error.error && typeof error.error === 'string') {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Mot de passe actuel incorrect ou nouveau mot de passe invalide.';
          }
        } else if (error.status === 403) {
          this.errorMessage = 'Accès refusé. Veuillez vous reconnecter.';
        } else if (error.status === 404) {
          this.errorMessage = 'Utilisateur non trouvé.';
        } else if (error.status === 0) {
          this.errorMessage = 'Impossible de contacter le serveur. Vérifiez que le backend est démarré.';
        } else {
          this.errorMessage = `Erreur lors du changement de mot de passe (${error.status}). Veuillez réessayer.`;
        }

        this.isLoading = false;

        setTimeout(() => {
          this.errorMessage = '';
        }, 7000);
      }
    });
  }

  testBackend(): void {
    console.log('Testing backend connectivity...');
    this.clearMessages();

    // Test authentication first
    const token = this.authService.getToken();
    const currentUser = this.authService.getCurrentUser();

    console.log('Authentication check:', {
      hasToken: !!token,
      tokenLength: token ? token.length : 0,
      currentUser: currentUser ? currentUser.email : 'none',
      isAuthenticated: this.authService.isAuthenticated()
    });

    // Test basic connectivity
    this.utilisateurService.testBackend().subscribe({
      next: (response) => {
        console.log('Backend test successful:', response);
        this.successMessage = 'Backend connecté avec succès! Auth: ' + (token ? 'OK' : 'NO TOKEN');
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },
      error: (error) => {
        console.error('Backend test failed:', error);
        this.errorMessage = `Backend non accessible: ${error.status} - ${error.statusText}`;
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }

  usePasswordReset(): void {
    if (this.currentUser && this.currentUser.email) {
      this.isLoading = true;
      this.clearMessages();

      this.utilisateurService.forgotPassword(this.currentUser.email).subscribe({
        next: () => {
          this.successMessage = 'Email de réinitialisation envoyé! Vérifiez votre boîte mail.';
          this.isLoading = false;
          setTimeout(() => {
            this.successMessage = '';
          }, 5000);
        },
        error: (error) => {
          console.error('Error sending reset email:', error);
          this.errorMessage = 'Erreur lors de l\'envoi de l\'email de réinitialisation.';
          this.isLoading = false;
          setTimeout(() => {
            this.errorMessage = '';
          }, 5000);
        }
      });
    }
  }

  goBack(): void {
    this.authService.redirectToDashboard();
  }
}
