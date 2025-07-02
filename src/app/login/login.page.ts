import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonInput, IonButton, IonText } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AutenticacaoService } from '../service/autenticacao.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonText,  IonButton, IonInput, IonContent, CommonModule, FormsModule, RouterLink]
})
export class LoginPage implements OnInit {
  public email:string = '';
  public password:string = '';

  public loginError:boolean = false;

  constructor(
    public autenticacao_service:AutenticacaoService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    if(this.err() == false){

      this.autenticacao_service
      .logar(this.email, this.password)
      .subscribe(
        (_res:any) => {
          if(_res.status == 'success'){
            // Autenticação realizada com sucesso!
            sessionStorage.setItem('token', _res.token);
            console.log("Logado");
            this.router.navigate(['/listar-tarefa']);
          }else{
            // Erro ao realizar autenticação
          }
        }
      );

    }
  }

  err(){
    if(this.email != '' || this.password != ''){
      this.loginError = false;
      return false 
    }
    else{
      this.loginError = true;
      return true
    }
  }
}
