import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NqiSearchComponent } from './nqi-search.component';

describe('NqiSearchComponent', () => {
  let component: NqiSearchComponent;
  let fixture: ComponentFixture<NqiSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NqiSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NqiSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
