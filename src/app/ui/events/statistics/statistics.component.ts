import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Event } from '../../object/event';
import { EventService } from '../../event.service';
import { AttendeeStatistics } from '../../object/attendee-statistics';
import { LoadingBarService } from '../../header/loading-bar.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnChanges {

  @Input() event: Event;
  pieChartData = {
    chartType: 'PieChart',
    dataTable: [
      ['', ''],
      ['Có mặt', 0],
      ['Vắng mặt', 0],
      ['Chỉ vào', 0],
      ['Chỉ ra', 0],
    ],
    options: { 'title': 'Điểm danh sinh viên' },
  };
  @ViewChild('cchart') cchart;

  constructor(private eventService: EventService, private loading: LoadingBarService) { }
  ngOnChanges(changes: SimpleChanges): void {
    this.loading.setLoading(true);
    this.eventService.statisticAttendee(this.event.id).subscribe(
      next => {

        this.pieChartData = {
          chartType: 'PieChart',
          dataTable: [
            ['', ''],
            ['Có mặt', next.present],
            ['Vắng mặt', next.absent],
            ['Chỉ vào', next.onlyIn],
            ['Chỉ ra', next.onlyOut],
          ],
          options: { 'title': 'Điểm danh sinh viên' },
        };
        this.loading.setLoading(false);
      }
    );

  }

}
