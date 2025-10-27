import { ComponentFixture, TestBed } from '@angular/core/testing';
import HomeIndexComponent from './home-index.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

describe('HomeIndexComponent', () => {
  let component: HomeIndexComponent;
  let fixture: ComponentFixture<HomeIndexComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ HomeIndexComponent ],
      providers: [provideAnimationsAsync()]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
