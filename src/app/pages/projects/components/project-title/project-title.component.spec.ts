import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTitleComponent } from './project-title.component';

describe('ProjectTitleComponent', () => {
  let component: ProjectTitleComponent;
  let fixture: ComponentFixture<ProjectTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTitleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function beforeEach(arg0: () => Promise<void>) {
  throw new Error('Function not implemented.');
}

function expect(component: ProjectTitleComponent) {
  throw new Error('Function not implemented.');
}

