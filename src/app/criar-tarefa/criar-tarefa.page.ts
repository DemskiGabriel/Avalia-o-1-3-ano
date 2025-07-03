import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonInput, IonList, IonItem, IonButton, IonTextarea, IonCheckbox } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';

interface Step {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-criar-tarefa',
  templateUrl: './criar-tarefa.page.html',
  styleUrls: ['./criar-tarefa.page.scss'],
  standalone: true,
  imports: [IonTextarea, IonButton, IonItem, IonList, IonInput, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCheckbox]
})
export class CriarTarefaPage implements OnInit {
  public id:number = 0;
  
  public title:string = '';
  public manager:string = '';
  public description:string = '';
  
  public steps: Step[] = [{ name: '', completed: false }];

  constructor(
    private rt: RealtimeDatabaseService, 
    private ar: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
  ) {
    this.ar.params.subscribe((param:any) => {
      this.id = param.id;
    })  
  }

  ngOnInit() {
    this.load();
  }
  load(){
    this.rt.query(`/criar-tarefa/${this.id}`, (snapshot:any) => {
      const dados = Object(snapshot.val())
      this.title = dados.title;
      this.manager = dados.manager;
      this.description = dados.description;
      this.steps = dados.steps ? dados.steps : [{ name: '', completed: false }];
    })
  }

  salvar(){
    this.rt.add(`/criar-tarefa`,{
      title: this.title,
      manager: this.manager,
      description: this.description,
      steps: this.steps
    }, this.id)
    .subscribe({
      next: (res:any) => {
        console.log(res);
        this.presentAlert();
      },
      error: (err) => {
        console.log('Falhou ', err);
      }
    });
  }
  // Alert when save.
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'SALVO COM SUCESSO',
      message: 'Precione "OK" para continuar.',
      buttons: [{
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.router.navigate(['/listar-tarefa']);
          } 
        }],
    });

    await alert.present();
  }

  // When click the "adicionarEtapa" button gonna add a new field to make a new step. 
  trackByIndex(index: number, item: any): number {
    return index;
  }
  adicionarEtapa() {
    this.steps.push({ name: '', completed: false });
  }
}
