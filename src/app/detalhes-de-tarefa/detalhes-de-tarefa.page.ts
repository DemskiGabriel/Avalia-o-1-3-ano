// detalhes-de-tarefa.page.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonList, IonProgressBar, IonCheckbox, IonFooter, IonButtons, IonBackButton, IonIcon, IonNote } from '@ionic/angular/standalone';
import { RealtimeDatabaseService } from '../firebase/realtime-database.service';
import { ActivatedRoute } from '@angular/router';

interface Step {
  name: string;
  completed: boolean;
}

interface Tarefa {
  id: string;
  title: string;
  manager: string;
  description: string;
  steps: Step[];
  // Se você for salvar a porcentagem no DB, adicione-a aqui:
  // completionPercentage?: number;
}

@Component({
  selector: 'app-detalhes-de-tarefa',
  templateUrl: './detalhes-de-tarefa.page.html',
  styleUrls: ['./detalhes-de-tarefa.page.scss'],
  standalone: true,
  imports: [IonNote, IonIcon, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonList, IonCheckbox, IonProgressBar, IonFooter, CommonModule, FormsModule]
})
export class DetalhesDeTarefaPage implements OnInit {
  public tarefaId: string | null = null;
  public tarefa: Tarefa | null = null;

  constructor(
    private rt: RealtimeDatabaseService,
    private ar: ActivatedRoute
  ) {
    this.ar.params.subscribe((param: any) => {
      this.tarefaId = param.id;
    });
  }

  ngOnInit() {
    this.load();
  }

  load() {
    if (this.tarefaId) {
      this.rt.query(`/criar-tarefa/${this.tarefaId}`, (snapshot: any) => {
        const dados = snapshot.val();
        if (dados) {
          this.tarefa = {
            id: this.tarefaId!,
            title: dados.title,
            manager: dados.manager,
            description: dados.description,
            steps: Array.isArray(dados.steps) ? dados.steps : [],
          };
          console.log('Tarefa carregada:', this.tarefa);
        } else {
          console.log('Tarefa não encontrada para o ID:', this.tarefaId);
          this.tarefa = null;
        }
      });
    } else {
      console.log('ID da tarefa não fornecido na URL.');
      this.tarefa = null;
    }
  }

  /**
   * Chamada quando uma checkbox de etapa é marcada/desmarcada.
   * Atualiza o estado da etapa no objeto local e no Firebase.
   * @param step A etapa que foi alterada.
   * @param index O índice da etapa no array 'steps' da tarefa.
   */
  onStepToggle(step: Step, index: number) {
    if (this.tarefaId && this.tarefa) {
      // O 'step.completed' já foi atualizado pelo [(ngModel)]
      // Agora, envie essa atualização para o Firebase.
      // O caminho é /criar-tarefa/ID_DA_TAREFA/steps/INDICE_DA_ETAPA/completed
      this.rt.update(`/criar-tarefa/${this.tarefaId}/steps/${index}`, { completed: step.completed })
        .then(() => {
          console.log(`Etapa ${index} (${step.name}) atualizada para ${step.completed} no Firebase.`);
          // A interface do usuário (barra de progresso e contadores) já se atualiza
          // automaticamente porque 'this.tarefa.steps' foi modificado localmente pelo ngModel.
        })
        .catch(error => {
          console.error('Erro ao atualizar etapa no Firebase:', error);
          // Opcional: Reverter o estado da checkbox localmente se a atualização falhar
          step.completed = !step.completed;
        });
    }
  }

  /**
   * Calcula a porcentagem de conclusão de uma tarefa.
   * @returns Um número entre 0 e 100.
   */
  getCompletionPercentage(): number {
    // Agora os métodos acessam this.tarefa diretamente
    const stepsArray: Step[] = Array.isArray(this.tarefa?.steps) ? this.tarefa!.steps : [];
    if (stepsArray.length === 0) {
      return 0;
    }
    const completedSteps = stepsArray.filter((step: Step) => step.completed).length;
    const totalSteps = stepsArray.length;
    return Math.round((completedSteps / totalSteps) * 100);
  }

  /**
   * Retorna o número de etapas concluídas de uma tarefa.
   * @returns O número de etapas concluídas.
   */
  getCompletedStepsCount(): number {
    // Agora os métodos acessam this.tarefa diretamente
    const stepsArray: Step[] = Array.isArray(this.tarefa?.steps) ? this.tarefa!.steps : [];
    return stepsArray.filter((step: Step) => step.completed).length;
  }

  /**
   * Retorna o número total de etapas de uma tarefa.
   * @returns O número total de etapas.
   */
  getTotalStepsCount(): number {
    // Agora os métodos acessam this.tarefa diretamente
    const stepsArray: Step[] = Array.isArray(this.tarefa?.steps) ? this.tarefa!.steps : [];
    return stepsArray.length;
  }
}