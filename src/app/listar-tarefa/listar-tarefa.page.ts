import { Component } from '@angular/core';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonItem, IonLabel, AlertController, IonNote, IonProgressBar, IonFab, IonFabButton, IonBackButton, IonButtons, IonItemSliding, IonItemOptions, IonItemOption } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Step {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: 'listar-tarefa.page.html',
  styleUrls: ['listar-tarefa.page.scss'],
  standalone: true,
  imports: [IonItemOption, IonItemOptions, IonItemSliding, IonButtons, IonBackButton, IonFabButton, IonFab, IonProgressBar,  IonNote, IonContent, IonHeader, IonIcon, IonTitle, IonToolbar, IonItem, IonLabel, CommonModule, RouterLink, FormsModule]
})
export class ListarTarefaPage {
  public dados:Array<any> = [];


  constructor(
    public rt: RealtimeDatabaseService,
    private alertController: AlertController
    ) {}
  
    ngOnInit() {
      this.load();
    }

  load() {
    this.rt.query('/criar-tarefa', (snapshot: any) => {
      if (snapshot.val() !== null) {
        this.dados = Object(snapshot.val()).
        map((item:any, key:number) => {
          item.id = key;
          return item;
        }).filter((item:any) => item != null);
      }else{
        this.dados = [];
      }
    })
  }

  /**
   * Calcula a porcentagem de conclusão de uma tarefa.
   * @param item O objeto da tarefa contendo as etapas.
   * @returns Um número entre 0 e 100.
   */
  getCompletionPercentage(item: any): number {
    // Verifica se item.steps existe e é um array. Se não for, retorna 0.
    const stepsArray: Step[] = Array.isArray(item.steps) ? item.steps : [];

    if (stepsArray.length === 0) {
      return 0;
    }
    const completedSteps = stepsArray.filter((step: Step) => step.completed).length;
    const totalSteps = stepsArray.length;
    return Math.round((completedSteps / totalSteps) * 100);
  }

  /**
   * Retorna o número de etapas concluídas de uma tarefa.
   * @param item O objeto da tarefa contendo as etapas.
   * @returns O número de etapas concluídas.
   */
  getCompletedStepsCount(item: any): number {
    // Verifica se item.steps existe e é um array. Se não for, retorna 0.
    const stepsArray: Step[] = Array.isArray(item.steps) ? item.steps : [];
    return stepsArray.filter((step: Step) => step.completed).length;
  }

  /**
   * Retorna o número total de etapas de uma tarefa.
   * @param item O objeto da tarefa contendo as etapas.
   * @returns O número total de etapas.
   */
  getTotalStepsCount(item: any): number {
    // Verifica se item.steps existe e é um array. Se não for, retorna 0.
    const stepsArray: Step[] = Array.isArray(item.steps) ? item.steps : [];
    return stepsArray.length;
  }

  // Function to delete the selected element in the list.
  async excluir(id:number){
    const alert = await this.alertController.create({
      header: 'TEM CERTEZA QUE DESEJA DELETAR?',
      message: 'Essa ação não podera ser desfeita',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'DELETE',
          role: 'confirm',
          handler: () => {
            this.rt.remove(`/criar-tarefa/${id}`).then();
          },
        },
      ],
    });

    await alert.present();
  }
}

