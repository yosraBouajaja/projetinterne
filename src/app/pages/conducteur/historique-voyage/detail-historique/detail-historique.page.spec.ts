import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailHistoriquePage } from './detail-historique.page';

describe('DetailHistoriquePage', () => {
  let component: DetailHistoriquePage;
  let fixture: ComponentFixture<DetailHistoriquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailHistoriquePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailHistoriquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
