/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AssistService } from './assist.service';

describe('Service: Assist', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssistService]
    });
  });

  it('should ...', inject([AssistService], (service: AssistService) => {
    expect(service).toBeTruthy();
  }));
});
