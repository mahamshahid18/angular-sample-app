import { TestBed, inject } from '@angular/core/testing';

import { MessageLogService } from './messageLog.service';

describe('MessageLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageLogService]
    });
  });

  it('should be created', inject([MessageLogService], (service: MessageLogService) => {
    expect(service).toBeTruthy();
  }));
});
