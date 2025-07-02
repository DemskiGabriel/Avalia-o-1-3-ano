import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonNote, IonList, IonProgressBar, IonCheckbox, IonFooter, IonButtons, IonBackButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhes-de-tarefa',
  templateUrl: './detalhes-de-tarefa.page.html',
  styleUrls: ['./detalhes-de-tarefa.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonAvatar, IonLabel, IonNote, IonList, IonCheckbox, IonProgressBar, IonFooter, CommonModule, FormsModule]
})
export class DetalhesDeTarefaPage implements OnInit {
  public tarefa:any;

  constructor() { }

  ngOnInit() {
    this.tarefa = 0.7;
  }
}
