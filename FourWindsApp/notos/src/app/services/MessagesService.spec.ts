import { TestBed } from '@angular/core/testing';

import { MessagesService } from './MessagesService';

describe('Todo', () => {
  let service: MessagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
