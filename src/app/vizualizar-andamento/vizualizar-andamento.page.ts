import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-vizualizar-andamento',
  templateUrl: './vizualizar-andamento.page.html',
  styleUrls: ['./vizualizar-andamento.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class VizualizarAndamentoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
