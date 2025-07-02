import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VizualizarAndamentoPage } from './vizualizar-andamento.page';

describe('VizualizarAndamentoPage', () => {
  let component: VizualizarAndamentoPage;
  let fixture: ComponentFixture<VizualizarAndamentoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VizualizarAndamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
