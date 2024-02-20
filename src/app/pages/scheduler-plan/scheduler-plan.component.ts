
import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { CommonModule } from '@angular/common';



import { MainserviceService } from '../../mainservice.service';
import { Subscription } from 'rxjs';
import { EventRenderedArgs, EventSettingsModel, GroupModel, Schedule, View } from '@syncfusion/ej2-angular-schedule';
import moment from 'moment';


@Component({
  selector: 'app-scheduler-plan',
  templateUrl: './scheduler-plan.component.html',
  styleUrls: ['./scheduler-plan.component.scss'],
 
})

export class SchedulerPlanComponent implements OnInit {

  selectedFile: File | null = null;  // Allow selectedFile to be File or null

  @ViewChild('scheduleObj')
  public scheduleObj: Schedule = new Schedule;
  public selectedDate: Date =  new Date(1706742205000);
scheduleData: any[] = [];
scheduleData2: any[] =[];
 data = localStorage.getItem('scheduleData');
 if (data: string) {
  this.scheduleData2=JSON.parse(data);
}

private scheduleSubscription: Subscription | undefined;

public rowAutoHeight = true;
public currentView: View = 'TimelineWeek';
public group: GroupModel = {
  enableCompactView: false,
  resources: ['MeetingRoom']
};

public temp: string = '<div class="tooltip-wrap">' +
'<div class="image ${EventType}"></div>' +
'<div class="content-area"><div class="name">${Subject}</></div>' +
'${if(City !== null && City !== undefined)}<div class="city">${City}</div>${/if}' +
'<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
'<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';


public allowMultiple = true;
public resourceDataSource: Record<string, any>[] = [
  { text: 'ROBOTIC CELL 1', id: 1, color: '#98AFC7' },
  { text: 'ROBOTIC CELL 02', id: 2, color: '#99c68e' },
  { text: 'ROBOTIC CELL 03', id: 3, color: '#C2B280' },
  { text: 'ROBOTIC CELL 04', id: 4, color: '#3090C7' },
  { text: 'ROBOTIC CELL 05', id: 5, color: '#95b9' },
  { text: 'ROBOTIC CELL 06', id: 6, color: '#95b9c7' },
  { text: 'ROBOTIC CELL 07', id: 7, color: '#deb887' },
  { text: 'ROBOTIC CELL 08', id: 8, color: '#3090C7' },
  { text: 'ROBOTIC CELL 09', id: 9, color: '#98AFC7' },
  { text: 'ROBOTIC CELL 10', id: 10, color: '#778899' }
];

public eventSettings: EventSettingsModel | undefined ;



constructor(private uploadService: MainserviceService) { }


// Helper function to convert date objects to the desired string format
convertToDateString(date:any) {
  const year = date.getFullYear();
  const month = date.getMonth(); // No +1 since we want zero-based month index for the Date constructor
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return new Date(year,month,day,hours,minutes);
}

ngOnInit() {
console.log(JSON.stringify(localStorage.getItem('scheduleData')));

  const data = localStorage.getItem('scheduleData');
 if (data) {
  const parsedData = JSON.parse(data);

  // Convert StartTime and EndTime back to Date objects
  this.scheduleData2 = parsedData.map((item: { StartTime: string | number | Date; EndTime: string | number | Date; }) => ({
      ...item,
      StartTime: this.convertToDateString(new Date(item.StartTime)),
      EndTime: this.convertToDateString(new Date(item.EndTime))
    }));

 
}
console.log(this.scheduleData2);
  // Subscribe to the scheduleSource BehaviorSubject to get the latest schedule data
  this.scheduleSubscription = this.uploadService.currentSchedule.subscribe(data => {
    this.scheduleData = data;
  });

  // Optionally, load the schedule data from local storage when the component initializes
  this.uploadService.loadScheduleFromLocalStorage();

  console.log(this.scheduleData);
  console.log(new Date(2024, 2, 1, 10, 23));
 this.eventSettings = {
      dataSource: extend([], this.scheduleData2, [], true) as Record<string, any>[],
      fields: {
        id: 'Id',
        subject: { name: 'Subject', title: 'Summary' },
        location: { name: 'Location', title: 'Location' },
        description: { name: 'Description', title: 'Comments' },
        startTime: { name: 'StartTime', title: 'From' },
        endTime: { name: 'EndTime', title: 'To' }
      },enableTooltip: true, tooltipTemplate: this.temp 
    };


    
}

ngOnDestroy() {
  // Unsubscribe to avoid memory leaks
  if (this.scheduleSubscription) {
    this.scheduleSubscription.unsubscribe();
  }
}

onChange(args: ChangeEventArgs): void {
  // this.scheduleObj.rowAutoHeight = args.checked;
}


public onPrintClick(): void {

    this.scheduleObj.print();
  
}

onFileChanged(event: Event) {
  const element = event.currentTarget as HTMLInputElement;
  let fileList: FileList | null = element.files;
  if (fileList) {
    this.selectedFile = fileList[0];
  } else {
    this.selectedFile = null;  // Explicitly set to null when no files are selected
  }
}

public onEventRendered(args: EventRenderedArgs): void {
  // Define an array of colors
  const colors = [
      '#98AFC7', // Color for job 1
      '#99c68e', // Color for job 2
      '#C2B280', // Color for job 3
      '#3090C7', // Color for job 4
      '#92b92b', // Color for job 5
      '#95b9c7', // Color for job 6
      '#deb887', // Color for job 7
      '#5D8AA8', // Alternative color for job 8, as #3090C7 is already used for job 4
      '#8A2BE2', // Alternative color for job 9, as #98AFC7 is already used for job 1
      '#778899'  // Color for job 10
    ];

  const categoryColor: any = args;

  // Check if the job is between 1 and 10
  if (categoryColor.data.Job >= 1 && categoryColor.data.Job <= 10) {
    // Use the job number as an index to select the color from the array
    // Note: Subtract 1 to align with array indexing (0-9 for jobs 1-10)
    categoryColor.element.style.backgroundColor = colors[categoryColor.data.Job - 1];
  }
}


onUpload() {
  if (this.selectedFile) {
    this.uploadService.uploadFile(this.selectedFile);
  }

} 
}
