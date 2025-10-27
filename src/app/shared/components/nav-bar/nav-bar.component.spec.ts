import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { provideRouter } from '@angular/router';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle mobile menu', () => {
    component.showMenuMovile = false;
    component.toggleMenu();
    expect(component.showMenuMovile).toBeTrue();

    component.toggleMenu();
    expect(component.showMenuMovile).toBeFalse();
  });

  it('should close mobile menu on resize if width > 768', () => {
    component.showMenuMovile = true;
    spyOnProperty(window, 'innerWidth').and.returnValue(1024);
    component.onResize();
    expect(component.showMenuMovile).toBeFalse();
  });
});

