
import { ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { extend } from '@syncfusion/ej2-base';
import { ChangeEventArgs } from '@syncfusion/ej2-buttons';
import { CommonModule } from '@angular/common';



import { MainserviceService } from '../../mainservice.service';
import { Subscription } from 'rxjs';
import { EventSettingsModel, GroupModel, Schedule, View } from '@syncfusion/ej2-angular-schedule';
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
public allowMultiple = true;
public resourceDataSource: Record<string, any>[] = [
  { text: 'MACHINE 01', id: 1, color: '#98AFC7' },
  { text: 'MACHINE 02', id: 2, color: '#99c68e' },
  { text: 'MACHINE 03', id: 3, color: '#C2B280' },
  { text: 'MACHINE 04', id: 4, color: '#3090C7' },
  { text: 'MACHINE 05', id: 5, color: '#95b9' },
  { text: 'MACHINE 06', id: 6, color: '#95b9c7' },
  { text: 'MACHINE 07', id: 7, color: '#deb887' },
  { text: 'MACHINE 08', id: 8, color: '#3090C7' },
  { text: 'MACHINE 09', id: 9, color: '#98AFC7' },
  { text: 'MACHINE 10', id: 10, color: '#778899' }
];

public eventSettings: EventSettingsModel | undefined ;



constructor(private uploadService: MainserviceService,private cdr: ChangeDetectorRef) { }


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
      }
    };



    this.cdr.detectChanges();
    
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

onUpload() {
  if (this.selectedFile) {
    this.uploadService.uploadFile(this.selectedFile);
  }

} 
}
