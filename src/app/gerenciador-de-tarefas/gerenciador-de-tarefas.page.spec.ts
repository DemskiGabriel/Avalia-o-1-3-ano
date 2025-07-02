import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GerenciadorDeTarefasPage } from './gerenciador-de-tarefas.page';

describe('GerenciadorDeTarefasPage', () => {
  let component: GerenciadorDeTarefasPage;
  let fixture: ComponentFixture<GerenciadorDeTarefasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorDeTarefasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
