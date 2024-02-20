import { Component, OnInit, ViewChild } from '@angular/core';
import { MainserviceService } from 'src/app/mainservice.service';
import { Subscription } from 'rxjs';
import { EventSettingsModel, GroupModel, Schedule, View } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-angular-grids';

interface Task {
  Description: string;
  EndTime: string;
  Id: number;
  Job: number;
  RoomId: number;
  StartTime: string;
  Subject: string;
}


@Component({
  selector: 'app-roboticcell',
  templateUrl: './roboticcell.component.html',
  styleUrls: ['./roboticcell.component.css']
})
export class RoboticcellComponent implements OnInit {
  data =  localStorage.getItem('scheduleData');
  selectedRoomId: number | null = null;
  roomIds = Array.from({length: 10}, (_, i) => i + 1); // Generates an array [1, 2, ..., 10]


  public temp: string = '<div class="tooltip-wrap">' +
    '<div class="image ${EventType}"></div>' +
    '<div class="content-area"><div class="name">${Subject}</></div>' +
    '${if(City !== null && City !== undefined)}<div class="city">${City}</div>${/if}' +
    '<div class="time">From&nbsp;:&nbsp;${StartTime.toLocaleString()} </div>' +
    '<div class="time">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;${EndTime.toLocaleString()} </div></div></div>';

  @ViewChild('scheduleObj')
  public scheduleObj: Schedule = new Schedule;
  public selectedDate: Date =  new Date(1706742205000);

  isOptimizationEnabled: boolean = false;
  
  private scheduleSubscription: Subscription | undefined;

  public rowAutoHeight = true;
public currentView: View = 'TimelineWeek';
public group: GroupModel = {
  enableCompactView: false,
  resources: ['MeetingRoom']
};
public allowMultiple = true;


public resourceDataSource: Record<string, any>[] = [
  { text: 'ROBOT', id: 2, color: '#98AFC7' },
  { text: 'MACHINE ', id: 1, color: '#99c68e' },
 
];

public eventSettings: EventSettingsModel | undefined ;
 
  constructor(private uploadService: MainserviceService)  { }

  ngOnInit(): void {
  }


  addMinutesToDate(dateString: string, minutes: number): string {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() + minutes);
    return date.toISOString();
  }


  // Function to get data from localStorage and parse it
  get scheduleData() {
    const dataString = localStorage.getItem('scheduleData');
    if (dataString) {
      try {
        return JSON.parse(dataString);
      } catch (e) {
        console.error('Error parsing schedule data from localStorage', e);
        return []; // Return an empty array in case of error
      }
    }
    return []; // Return an empty array if localStorage item is not found
  }


  convertToDateString(date:any) {
    const year = date.getFullYear();
    const month = date.getMonth(); // No +1 since we want zero-based month index for the Date constructor
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return new Date(year,month,day,hours,minutes);
  }

  onRoomChange(selectedValue: string): void {
    console.log('Selected Room ID:', selectedValue);
    // Convert selectedValue to the appropriate type if necessary
    const selectedRoomId = selectedValue ? Number(selectedValue) : null;
    this.selectedRoomId=selectedRoomId;
    this.filteredData;
  
  }
  
  

  onCheckboxChange() {
    this.filteredData;
  }
  // Function to filter the data based on selectedRoomId
  get filteredData() {

   
   
     // Convert StartTime and EndTime back to Date objects
     const data  = this.scheduleData.map((item: { StartTime: string | number | Date; EndTime: string | number | Date; }) => ({
         ...item,
         StartTime: this.convertToDateString(new Date(item.StartTime)),
         EndTime: this.convertToDateString(new Date(item.EndTime))
       }));
   

  // Get the parsed data
    if (!this.selectedRoomId) return data; // If no room is selected, return all data
    const selectedData=data.filter(item => item.RoomId ==this.selectedRoomId);
    console.log(selectedData);
    const modifiedTaskss = this.addRobotTasks(selectedData);
console.log(modifiedTaskss);
 // Check if optimization is enabled before calling the optimizeTasks function
 const optimizedTasks = this.isOptimizationEnabled ? this.optimizeTasks(modifiedTaskss) : modifiedTaskss;

 this.eventSettings = {
  dataSource: extend([], optimizedTasks,[]) as Record<string, any>[],
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


  addMinutes(date: Date, minutes: number): string {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result.toISOString();
  }


  optimizeTasks(tasks: Task[]): Task[] {
    // Count the frequency of each task ID
    const idCountMap = new Map<number, number>();
    tasks.forEach(task => {
      const taskId = parseInt(task.Subject.match(/\d+/)[0]); // Extract task ID from subject string
      idCountMap.set(taskId, (idCountMap.get(taskId) || 0) + 1);
    });
  
    // Find the most frequent task ID
    let mostFrequentId: number | undefined;
    let maxCount = 0;
    idCountMap.forEach((count, id) => {
      if (count > maxCount) {
        mostFrequentId = id;
        maxCount = count;
      }
    });
  
    if (mostFrequentId === undefined) {
      // If no task IDs are found, return the original tasks
      return tasks;
    }
  
    // Optimize tasks by assigning ID 2 to all tasks with the most frequent task ID
    return tasks.map(task => {
      const taskId = parseInt(task.Subject.match(/\d+/)[0]); // Extract task ID from subject string
      if (taskId === mostFrequentId) {
        return { ...task, Id: 2, RoomId: 2 }; // Assign ID 2 and Room ID 2 to the task
      } else {
        return task;
      }
    });
  }
  

addRobotTasks(tasks: Task[]): Task[] {
  const modifiedTasks: Task[] = [];

  tasks.forEach((task, index) => {
    // Loading task for the robot
    const loadingStartTime = index === 0 ? this.addMinutes(new Date(task.StartTime), -10) : modifiedTasks[modifiedTasks.length - 1].EndTime;
    const loadingEndTime = this.addMinutes(new Date(loadingStartTime), 10);

    const loadingTask: Task = {
      ...task,
      Description: "Loading " + task.Description,
      Id: 2, // Robot ID
      RoomId: 2, // Robot's room ID
      StartTime: loadingStartTime,
      EndTime: loadingEndTime,
      Subject: "Loading for " + task.Subject
    };
    modifiedTasks.push(loadingTask);

    // Original task
    const originalTask: Task = {
      ...task,
      StartTime: loadingEndTime,
      Id: 1,
      EndTime: this.addMinutes(new Date(loadingEndTime), (new Date(task.EndTime).getTime() - new Date(task.StartTime).getTime()) / 60000),
      RoomId: 1 // Machine's room ID
    };
    modifiedTasks.push(originalTask);

    // Unloading task for the robot
    const unloadingStartTime = originalTask.EndTime;
    const unloadingEndTime = this.addMinutes(new Date(unloadingStartTime), 10);

    const unloadingTask: Task = {
      ...task,
      Description: "Unloading " + task.Description,
      Id: 2, // Robot ID
      RoomId: 2, // Robot's room ID
      StartTime: unloadingStartTime,
      EndTime: unloadingEndTime,
      Subject: "Unloading for " + task.Subject
    };
    modifiedTasks.push(unloadingTask);
  });

  return modifiedTasks;
}

  

  
}
