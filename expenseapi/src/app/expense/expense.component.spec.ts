import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseComponent } from './expense.component';
import { ExpenseService } from './expense.service';

describe('ExpenseComponent', () => {
  let component: ExpenseComponent;
  let fixture: ComponentFixture<ExpenseComponent>;


  // Code executed before each test.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // Tests.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // 
  it('should use the expense category from the service', ()=> { 
    let expenseService = fixture.debugElement.injector.get(ExpenseService);
    // Need change detection after injecting the service to update properties.
    fixture.detectChanges();
    expect(expenseService.getAllEntries()).toEqual(component.expenses);
  })
});
