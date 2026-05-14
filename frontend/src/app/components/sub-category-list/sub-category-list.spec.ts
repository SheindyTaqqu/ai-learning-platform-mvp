import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubCategoryList } from './sub-category-list';

describe('SubCategoryList', () => {
  let component: SubCategoryList;
  let fixture: ComponentFixture<SubCategoryList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubCategoryList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubCategoryList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
