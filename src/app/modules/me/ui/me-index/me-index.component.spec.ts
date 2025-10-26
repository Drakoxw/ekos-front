import { ComponentFixture, TestBed } from '@angular/core/testing';
import MeIndexComponent from './me-index.component';

describe('MeIndexComponent', () => {
  let component: MeIndexComponent;
  let fixture: ComponentFixture<MeIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeIndexComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
