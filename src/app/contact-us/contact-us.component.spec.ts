import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ContactUsComponent} from './contact-us.component';

describe('ContactUsComponent', () => {
  let component: ContactUsComponent;
  let fixture: ComponentFixture<ContactUsComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [ContactUsComponent]}).compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(ContactUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have FontAwesome icons defined', () => {
    expect(component.faPhone).toBeDefined();
    expect(component.faEnvelope).toBeDefined();
    expect(component.faClock).toBeDefined();
    expect(component.faLocation).toBeDefined();
    expect(component.faShare).toBeDefined();
    expect(component.faComment).toBeDefined();
    expect(component.faTelephone).toBeDefined();
  });
});
