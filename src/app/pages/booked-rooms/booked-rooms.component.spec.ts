import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedRoomsComponent } from './booked-rooms.component';

describe('BookedRoomsComponent', () => {
  let component: BookedRoomsComponent;
  let fixture: ComponentFixture<BookedRoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookedRoomsComponent]
    });
    fixture = TestBed.createComponent(BookedRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
