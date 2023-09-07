import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';

import { BehaviorSubject } from 'rxjs';
import { LoadingHttpInterceptorService } from 'src/app/shared/interceptors/loading-http-interceptor/loading-http-interceptor.service';

describe(`${LoadingComponent.name}`, () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  const loadingService = {
    loading$: new BehaviorSubject<boolean>(false),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
      providers: [
        {
          provide: LoadingHttpInterceptorService,
          useValue: loadingService,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it(`${LoadingComponent.name} - should create component`, () => {
    expect(component).toBeTruthy();
  });

  it(`${LoadingComponent.name} - should show spinner when loading is true`, () => {
    loadingService.loading$.next(true);
    fixture.detectChanges();
    const overlayElement = fixture.nativeElement.querySelector('.overlay');
    expect(overlayElement).toBeTruthy();
  });

  it(`${LoadingComponent.name} - should not show spinner when loading is false`, () => {
    loadingService.loading$.next(false);
    fixture.detectChanges();
    const overlayElement = fixture.nativeElement.querySelector('.overlay');
    expect(overlayElement).toBeFalsy();
  });
});
