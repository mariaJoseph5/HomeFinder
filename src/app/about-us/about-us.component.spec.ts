import {ComponentFixture, TestBed} from '@angular/core/testing';
import {AboutUsComponent} from './about-us.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

describe('AboutUsComponent', () => {
  let component: AboutUsComponent;
  let fixture: ComponentFixture<AboutUsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutUsComponent],
      imports: [FontAwesomeModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AboutUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have FontAwesome icons defined', () => {
    expect(component.faComment).toBeDefined();
    expect(component.faMobile).toBeDefined();
    expect(component.faHandShake).toBeDefined();
    expect(component.faLocation).toBeDefined();
    expect(component.faHome).toBeDefined();
    expect(component.faPerson).toBeDefined();
    expect(component.faTrophy).toBeDefined();
    expect(component.faBullsEye).toBeDefined();
  });
});
