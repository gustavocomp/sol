import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { getTranslocoModule } from 'src/app/transloco-testing.module';
import { ToolbarComponent } from './toolbar.component';

describe(`${ToolbarComponent.name}`, () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ToolbarComponent, getTranslocoModule(), BrowserAnimationsModule, MatSidenavModule],
    });

    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it(`${ToolbarComponent.name} - should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`${ToolbarComponent.name} - should initialize with sideNavIsOpened as true`, () => {
    expect(component.sideNavIsOpened).toBe(true);
  });

  it(`${ToolbarComponent.name} - should call removeAllMyItems and navigate to "/sign-in" on logout`, () => {
    const storageServiceSpy = spyOn(component['storageService'], 'removeAllMyItems');
    const routerSpy = spyOn(router, 'navigate');
    component.logout();

    expect(storageServiceSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalledWith(['/sign-in']);
  });

  it(`${ToolbarComponent.name} - should change tooltipMessage and toogleIcon on toogleSideNav`, () => {
    component.toogleSideNav();

    expect(component.tooltipMessage).toBe('LABELS.MSG0012');
    expect(component.toogleIcon).toBe('menu_open');

    component.toogleSideNav();

    expect(component.tooltipMessage).toBe('LABELS.MSG0011');
    expect(component.toogleIcon).toBe('menu');
  });
});
