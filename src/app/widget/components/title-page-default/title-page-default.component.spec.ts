import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TitlePageDefaultComponent } from './title-page-default.component';

describe(`${TitlePageDefaultComponent.name}`, () => {
  let component: TitlePageDefaultComponent;
  let fixture: ComponentFixture<TitlePageDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, TitlePageDefaultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TitlePageDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${TitlePageDefaultComponent.name} - should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`${TitlePageDefaultComponent.name} - should render the title correctly`, () => {
    const titleText = 'Test Title';
    component.title = titleText;
    fixture.detectChanges();
    const titleElement = fixture.nativeElement.querySelector('.title-page-default');
    expect(titleElement.textContent).toContain(titleText);
  });
});
