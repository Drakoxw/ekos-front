import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideZonelessChangeDetection } from '@angular/core';



describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('Zoneless', async () => {
    const fixture = TestBed.createComponent(App);
    const stable = await fixture.whenStable();
    expect(stable).toBeTruthy();
  })
});
