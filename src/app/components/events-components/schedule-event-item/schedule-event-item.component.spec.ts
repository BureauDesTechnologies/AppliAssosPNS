import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScheduleEventItemComponent} from './schedule-event-item.component';

describe('ScheduleEventItemComponent', () => {
    let component: ScheduleEventItemComponent;
    let fixture: ComponentFixture<ScheduleEventItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ScheduleEventItemComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ScheduleEventItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
