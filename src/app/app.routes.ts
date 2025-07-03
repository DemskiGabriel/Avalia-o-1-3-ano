import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./cadastro/cadastro.page').then( m => m.CadastroPage)
  },
  {
    path: 'criar-tarefa',
    loadComponent: () => import('./criar-tarefa/criar-tarefa.page').then( m => m.CriarTarefaPage)
  },
  {
    path: 'criar-tarefa/:id',
    loadComponent: () => import('./criar-tarefa/criar-tarefa.page').then( m => m.CriarTarefaPage)
  },
  {
    path: 'listar-tarefa',
    loadComponent: () => import('./listar-tarefa/listar-tarefa.page').then( m => m.ListarTarefaPage)
  },
  {
    path: 'detalhes-de-tarefa',
    loadComponent: () => import('./listar-tarefa/listar-tarefa.page').then( m => m.ListarTarefaPage)
  },
  {
    path: 'detalhes-de-tarefa/:id',
    loadComponent: () => import('./detalhes-de-tarefa/detalhes-de-tarefa.page').then( m => m.DetalhesDeTarefaPage)
  },
];
