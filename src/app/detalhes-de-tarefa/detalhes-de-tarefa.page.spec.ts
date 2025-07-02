import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalhesDeTarefaPage } from './detalhes-de-tarefa.page';

describe('DetalhesDeTarefaPage', () => {
  let component: DetalhesDeTarefaPage;
  let fixture: ComponentFixture<DetalhesDeTarefaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesDeTarefaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
