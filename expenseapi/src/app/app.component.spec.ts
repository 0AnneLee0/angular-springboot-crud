import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

// To run tests through CLI, run ng test in the terminal.


// Executed by test runner.
describe('AppComponent', () => {

  // Code run before each test block.
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));


  // Tests blocks are independent of each other.
  it('should create the app', () => {
    // Fixture holds the created component.
    const fixture = TestBed.createComponent(AppComponent);
    // Debug element property allows you to access elements to look at.
    const app = fixture.debugElement.componentInstance;
    // Ends with expectation the app exists.
    expect(app).toBeTruthy();
  });

  it(`should have as title 'expenseapi'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('expenseapi');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('expenseapi!');
  // });
});
