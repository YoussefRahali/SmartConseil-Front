import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder,Validators,FormGroup, FormControl } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { ConseilService } from '../conseil.service';
import { Utilisateur } from 'src/app/utilisateur/Utilisateur';
import { Conseil } from '../conseil/Conseil';
import { ConseilDTO } from '../conseil/ConseilDTO';
import { Salle } from '../salle/Salle';

@Component({
  selector: 'app-ajout-cons',
  templateUrl: './ajout-cons.component.html',
  styleUrls: ['./ajout-cons.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule]
})
export class AjoutConsComponent implements OnInit {

Users:Utilisateur[]=[];

constructor(private formBuilder: FormBuilder,HttpClient:HttpClientModule,private conseilService:ConseilService,private router: Router ) { }

ConseilForm!:FormGroup;
  Salles:Salle[]=[];
  durees: string[] = [
    '1h00',
    '1h30',
    '2h00',
    '2h30',
    '3h00'
  ];
  ngOnInit(): void {
    this.GetAllSalle();
    this.GetAlluser();

    console.log(sessionStorage.getItem('token'));

this.ConseilForm = new FormGroup({
  classes: new FormControl('', Validators.required),
  date: new FormControl('', Validators.required),
  heure: new FormControl('', Validators.required),
  duree: new FormControl('', Validators.required),
  salleId: new FormControl('', Validators.required),
    presidentId: new FormControl('', Validators.required),
    rapporteurId: new FormControl('', Validators.required),
  description: new FormControl(''),
  etat: new FormControl(false,Validators.required)
});

  }



  getPresidents(): Utilisateur[] {
  return this.Users.filter(user => user.role === 'president');
}

getRapporteurs(): Utilisateur[] {
  return this.Users.filter(user => user.role === 'rapporteur');
}


onSubmit() {
  let formValue = this.ConseilForm.value;

  let conseil: ConseilDTO = {
    id: 0,
    date: formValue.date,
    duree: formValue.duree,
    description: formValue.description,
    classes: formValue.classes,
    salleId: formValue.salleId,
    heure: formValue.heure,
    presidentId: formValue.presidentId,
    raporteurId: formValue.rapporteurId,
    etat:false,
    deroulement:'pas-debute'
   
  };

  console.log(conseil);

  this.conseilService.addConseil(conseil).subscribe(data => {
    console.log('Conseil ajouté', data);
    this.router.navigate(['/conseil']);
  });
}


GetAlluser()
{
this.conseilService.getUsers().subscribe(data=>{
  console.log(data);
  
  this.Users=data;});

}


  GetAllSalle(){
this.conseilService.getSalles().subscribe(data=>{
  console.log(data);
  
  this.Salles=data;})
}

}
