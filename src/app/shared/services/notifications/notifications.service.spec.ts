import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { NotificationsService } from './notifications.service';

describe(`${NotificationsService.name}`, () => {
  let service: NotificationsService;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NotificationsService,
        {
          provide: ToastrService,
          useValue: jasmine.createSpyObj('ToastrService', ['success', 'error', 'warning', 'info']),
        },
      ],
    });
    service = TestBed.inject(NotificationsService);
    toastrService = TestBed.inject(ToastrService);
  });

  it(`${NotificationsService.name} - should call ToastrService success with correct message`, () => {
    const message = 'Test success message';
    service.success(message);

    expect(toastrService.success).toHaveBeenCalledWith(message, '', jasmine.any(Object));
  });

  it(`${NotificationsService.name} - should call ToastrService error with correct message`, () => {
    const message = 'Test error message';
    service.error(message);

    expect(toastrService.error).toHaveBeenCalledWith(message, '', jasmine.any(Object));
  });

  it(`${NotificationsService.name} - should call ToastrService warning with correct message`, () => {
    const message = 'Test warning message';
    service.warning(message);

    expect(toastrService.warning).toHaveBeenCalledWith(message, '', jasmine.any(Object));
  });

  it(`${NotificationsService.name} - should call ToastrService info with correct message`, () => {
    const message = 'Test info message';
    service.info(message);

    expect(toastrService.info).toHaveBeenCalledWith(message, '', jasmine.any(Object));
  });
});
