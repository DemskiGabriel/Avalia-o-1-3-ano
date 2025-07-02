import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonText } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { RequisicaoService } from '../service/requisicao.service';

@Component({
  selector: 'app-register',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonText, IonButton, IonInput,  IonContent, CommonModule, FormsModule, RouterLink]
})
export class CadastroPage implements OnInit {
  public username:string = '';
  public email:string = '';
  public pass:string = '';
  public confirmPass:string = '';

  public registerErr:boolean = false;
  public passErr:boolean = false;

  constructor(
    public rs:RequisicaoService
  ) { }

  ngOnInit() {
  }
  
  post() {
    if(this.err() == false){
      // POST
      const fd = new FormData();
      fd.append('controller','cadastro-usuario');
      fd.append('name', this.username);
      fd.append('email', this.email);
      fd.append('password', this.pass);
      this.rs
      .post(fd)
      .subscribe(
        () => {console.log();}
      );
    }

    console.log("Campos não preenchidos: " + this.registerErr);
    console.log("Senhas diferentes: " + this.passErr);
  }

  err() {
    let allFieldsFilled = [this.username, this.email, this.pass, this.confirmPass];
    this.registerErr = allFieldsFilled.some(field => field.trim() === '');

    if(this.registerErr)  return true
    else if(this.pass !== this.confirmPass){
      this.passErr = true;

      return true;
    };

    return false;
  }
}
