import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { UtilisateurService } from './utilisateur.service';
import { Router } from '@angular/router';
import { Utilisateur } from './utilisateur';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('video') videoElementRef!: ElementRef<HTMLVideoElement>;
emailPasswordVerified: boolean = false;
faceVerified: boolean = false;

  methode: 'password' | 'face' = 'password';
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  cameraStarted = false;
  cameraStream: MediaStream | null = null;
  showWebcam: boolean = false;  
  
  resultMessage: string = '';

  trigger: Subject<void> = new Subject<void>();
 webcamImage: WebcamImage | null = null;
  user: Utilisateur = new Utilisateur();

  constructor(private userService: UtilisateurService, private router: Router,private http: HttpClient) {}

  ngOnInit(): void {
    localStorage.clear();
   
  }

  ngAfterViewInit(): void {
    if (this.methode === 'face') {
      this.startCamera();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['methode']) {
      const newValue = changes['methode'].currentValue;
      if (newValue === 'face') {
        this.startCamera();
      } else if (newValue === 'password') {
        this.stopCamera();
      }
    }
  }

  setMethode(type: 'password' | 'face') {
    this.methode = type;

    if (type === 'face') {
      setTimeout(() => this.startCamera(), 0);
    } else if (type === 'password') {
      this.stopCamera();
    }
  }

onLogin(): void {
  // Cas où l'identifiant est déjà validé, mais pas le face ID
  if (this.emailPasswordVerified && !this.faceVerified) {
    this.errorMessage = '✅ Identifiants valides. Veuillez valider votre Face ID.';
    return;
  }

  // Cas normal (première tentative de connexion)
  if (!this.email || !this.password) {
    this.errorMessage = 'Veuillez remplir tous les champs';
    return;
  }

  const user = { email: this.email, password: this.password };

  this.userService.login(user).subscribe(
    (response) => {
      sessionStorage.setItem('token', response.token);
      sessionStorage.setItem('username', response.username);
      sessionStorage.setItem('id', response.id);
      sessionStorage.setItem('role', response.role);

      this.emailPasswordVerified = true;
      this.errorMessage = '✅ Identifiants valides. Veuillez valider votre Face ID.';

    if(response.role=='enseignant'){
      this.router.navigate(['/enseignant-conseil']);
    }else if(response.role=='RAPPORTEUR'){
      this.router.navigate(['/conseil']);
    }
    else if(response.role=='PRESIDENT'){
      this.router.navigate(['/president']);
    }
    },
    (error) => {
      console.error('Erreur de connexion :', error);
      this.errorMessage = '❌ Nom d’utilisateur ou mot de passe incorrect';
    }
  );
}


  startCamera(): void {
    if (this.cameraStarted || !this.videoElementRef) return;

    const video = this.videoElementRef.nativeElement;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
        this.cameraStream = stream;
        this.cameraStarted = true;
      })
      .catch((error) => {
        console.error('Erreur accès caméra :', error);
        alert("Impossible d'accéder à la caméra");
      });
  }

  stopCamera(): void {
    if (this.cameraStream) {
      this.cameraStream.getTracks().forEach(track => track.stop());
      this.cameraStream = null;
      this.cameraStarted = false;

      if (this.videoElementRef?.nativeElement) {
        this.videoElementRef.nativeElement.srcObject = null;
      }
    }
  }
triggerSnapshot(): void {
  console.log("Snapshot triggered");
  this.trigger.next();
}

handleImage(webcamImage: WebcamImage): void {
  this.webcamImage = webcamImage;
  console.log("Image captured:", webcamImage);
  const headers = {
    'Content-Type': 'application/json'
  };

  this.http.post('http://127.0.0.1:5000/verify-face', {
    image: webcamImage.imageAsDataUrl
  }, {
    headers: headers,
    withCredentials: true
  }).subscribe((res: any) => {
    this.resultMessage = res.verified ? "✅ Face Verified!" : "❌ Verification Failed";

    if (res.verified) {
      this.faceVerified = true;

      // Naviguer uniquement si email+password validés aussi
      if (this.emailPasswordVerified && this.faceVerified) {
        this.router.navigate(['/conseil']);
      }
    } else {
      this.faceVerified = false;
    }
  }, error => {
    console.error("Verification error:", error);
    this.resultMessage = "❌ Error during verification.";
  });
}

}
