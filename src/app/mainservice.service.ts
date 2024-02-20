import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ApiResponse {
  data: any[];
  start: string;
  end: string;
}


interface Task {
  Description: string;
  EndTime: string;
  Id: number;
  Job: number;
  RoomId: number;
  StartTime: string;
  Subject: string;
}

interface ToolChangeSchedule {
  ToolID: number;
  ChangeTime: string;
  Machine: string;
}

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  public scheduleSource = new BehaviorSubject<any[]>([]);
  currentSchedule = this.scheduleSource.asObservable();
  private uploadCompleteSubject = new Subject<any>();
  public uploadComplete$ = this.uploadCompleteSubject.asObservable();
  scheduleData2
 constructor(private http: HttpClient) { 
  // localStorage.setItem('scheduleData', JSON.stringify(roomData1));
 }

 // Assuming each tool has a lifespan (in minutes)
 toolLifespan: { [key: number]: number } = {
  1: 330,
  2: 440,
  3: 440,
  4: 240,
  5: 470,
  6: 646,
  7: 540,
  8: 560,
  9: 540,
  10: 340,
};

 accumulatedTime: { [key: number]: number } = {};

 toolChangeSchedule: ToolChangeSchedule[] = [];

 // Helper function to convert date objects to the desired string format
convertToDateString(date:any) {
  const year = date.getFullYear();
  const month = date.getMonth(); // No +1 since we want zero-based month index for the Date constructor
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  return new Date(year,month,day,hours,minutes);
}


// Helper function to parse date strings and calculate the duration in minutes
 getDurationInMinutes(startTimeStr: string, endTimeStr: string): number {
  const startTime = new Date(startTimeStr);
  const endTime = new Date(endTimeStr);
  return (endTime.getTime() - startTime.getTime()) / (1000 * 60);
}

// Helper function to format dates as "yyyy-MM-dd HH:mm:ss"
 formatDate(date: Date): string {
  const pad = (num: number) => (num < 10 ? `0${num}` : num);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}


 uploadFile(file: File) {
   const formData: FormData = new FormData();
   formData.append('file', file, file.name);

   this.http.post<any[]>('http://127.0.0.1:5000/upload', formData).subscribe(
     response => {
       console.log(response);

       this.dataLoad(true,response);
      
      
     },
     error => {
      this.dataLoad(false,[]);
       console.error('There was an error uploading the file', error);
     }
   );
 }

 // Call this method to load the schedule data from local storage
 loadScheduleFromLocalStorage() {
   const data = localStorage.getItem('scheduleData');
   if (data) {
     this.scheduleSource.next(JSON.parse(data));
   }
 }

 // Call this method to clear the schedule data from local storage
 clearScheduleFromLocalStorage() {
   localStorage.removeItem('scheduleData');
 }



 notifyUploadComplete(data: any) {
  this.uploadCompleteSubject.next(data);
}

dataLoad(status:boolean,response:any[]){

  

  const data =[
    {
        "Description": "Machine 3",
        "EndTime": 1706775240000,
        "Id": 3,
        "Job": 5,
        "RoomId": 3,
        "StartTime": 1706770800000,
        "Subject": "Task 1 of Job 5"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706773560000,
        "Id": 2,
        "Job": 7,
        "RoomId": 2,
        "StartTime": 1706770800000,
        "Subject": "Task 1 of Job 7"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706773380000,
        "Id": 1,
        "Job": 2,
        "RoomId": 1,
        "StartTime": 1706770800000,
        "Subject": "Task 1 of Job 2"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706779020000,
        "Id": 1,
        "Job": 5,
        "RoomId": 1,
        "StartTime": 1706775240000,
        "Subject": "Task 2 of Job 5"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706778660000,
        "Id": 2,
        "Job": 10,
        "RoomId": 2,
        "StartTime": 1706773560000,
        "Subject": "Task 1 of Job 10"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706780640000,
        "Id": 3,
        "Job": 2,
        "RoomId": 3,
        "StartTime": 1706775240000,
        "Subject": "Task 2 of Job 2"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706780340000,
        "Id": 2,
        "Job": 5,
        "RoomId": 2,
        "StartTime": 1706779020000,
        "Subject": "Task 3 of Job 5"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706785680000,
        "Id": 3,
        "Job": 6,
        "RoomId": 3,
        "StartTime": 1706780640000,
        "Subject": "Task 1 of Job 6"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706781240000,
        "Id": 1,
        "Job": 7,
        "RoomId": 1,
        "StartTime": 1706779020000,
        "Subject": "Task 2 of Job 7"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706785140000,
        "Id": 5,
        "Job": 2,
        "RoomId": 5,
        "StartTime": 1706780640000,
        "Subject": "Task 3 of Job 2"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706785200000,
        "Id": 2,
        "Job": 4,
        "RoomId": 2,
        "StartTime": 1706780340000,
        "Subject": "Task 1 of Job 4"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706784900000,
        "Id": 4,
        "Job": 7,
        "RoomId": 4,
        "StartTime": 1706781240000,
        "Subject": "Task 3 of Job 7"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706785800000,
        "Id": 1,
        "Job": 9,
        "RoomId": 1,
        "StartTime": 1706781240000,
        "Subject": "Task 1 of Job 9"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706790120000,
        "Id": 10,
        "Job": 2,
        "RoomId": 10,
        "StartTime": 1706785140000,
        "Subject": "Task 4 of Job 2"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706787540000,
        "Id": 3,
        "Job": 8,
        "RoomId": 3,
        "StartTime": 1706785680000,
        "Subject": "Task 1 of Job 8"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706789580000,
        "Id": 2,
        "Job": 6,
        "RoomId": 2,
        "StartTime": 1706785680000,
        "Subject": "Task 2 of Job 6"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706793720000,
        "Id": 2,
        "Job": 9,
        "RoomId": 2,
        "StartTime": 1706789580000,
        "Subject": "Task 2 of Job 9"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706784000000,
        "Id": 6,
        "Job": 5,
        "RoomId": 6,
        "StartTime": 1706780340000,
        "Subject": "Task 4 of Job 5"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706792700000,
        "Id": 6,
        "Job": 6,
        "RoomId": 6,
        "StartTime": 1706789580000,
        "Subject": "Task 3 of Job 6"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706792700000,
        "Id": 1,
        "Job": 8,
        "RoomId": 1,
        "StartTime": 1706787540000,
        "Subject": "Task 2 of Job 8"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706788320000,
        "Id": 3,
        "Job": 7,
        "RoomId": 3,
        "StartTime": 1706787540000,
        "Subject": "Task 4 of Job 7"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706788620000,
        "Id": 4,
        "Job": 5,
        "RoomId": 4,
        "StartTime": 1706784900000,
        "Subject": "Task 5 of Job 5"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706798400000,
        "Id": 4,
        "Job": 6,
        "RoomId": 4,
        "StartTime": 1706792700000,
        "Subject": "Task 4 of Job 6"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706802540000,
        "Id": 4,
        "Job": 2,
        "RoomId": 4,
        "StartTime": 1706798400000,
        "Subject": "Task 5 of Job 2"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706807100000,
        "Id": 4,
        "Job": 9,
        "RoomId": 4,
        "StartTime": 1706802540000,
        "Subject": "Task 3 of Job 9"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706790240000,
        "Id": 7,
        "Job": 7,
        "RoomId": 7,
        "StartTime": 1706788320000,
        "Subject": "Task 5 of Job 7"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706794020000,
        "Id": 3,
        "Job": 4,
        "RoomId": 3,
        "StartTime": 1706788320000,
        "Subject": "Task 2 of Job 4"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706794140000,
        "Id": 1,
        "Job": 10,
        "RoomId": 1,
        "StartTime": 1706792700000,
        "Subject": "Task 2 of Job 10"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706797800000,
        "Id": 3,
        "Job": 10,
        "RoomId": 3,
        "StartTime": 1706794140000,
        "Subject": "Task 3 of Job 10"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706802120000,
        "Id": 7,
        "Job": 10,
        "RoomId": 7,
        "StartTime": 1706797800000,
        "Subject": "Task 4 of Job 10"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706793960000,
        "Id": 6,
        "Job": 7,
        "RoomId": 6,
        "StartTime": 1706792700000,
        "Subject": "Task 6 of Job 7"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706796480000,
        "Id": 2,
        "Job": 8,
        "RoomId": 2,
        "StartTime": 1706793720000,
        "Subject": "Task 3 of Job 8"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706797920000,
        "Id": 1,
        "Job": 1,
        "RoomId": 1,
        "StartTime": 1706794140000,
        "Subject": "Task 1 of Job 1"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706802180000,
        "Id": 1,
        "Job": 4,
        "RoomId": 1,
        "StartTime": 1706797920000,
        "Subject": "Task 3 of Job 4"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706802600000,
        "Id": 2,
        "Job": 1,
        "RoomId": 2,
        "StartTime": 1706797920000,
        "Subject": "Task 2 of Job 1"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706792760000,
        "Id": 5,
        "Job": 5,
        "RoomId": 5,
        "StartTime": 1706788620000,
        "Subject": "Task 6 of Job 5"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706808120000,
        "Id": 5,
        "Job": 4,
        "RoomId": 5,
        "StartTime": 1706802180000,
        "Subject": "Task 4 of Job 4"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706811660000,
        "Id": 7,
        "Job": 4,
        "RoomId": 7,
        "StartTime": 1706808120000,
        "Subject": "Task 5 of Job 4"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706801280000,
        "Id": 9,
        "Job": 6,
        "RoomId": 9,
        "StartTime": 1706798400000,
        "Subject": "Task 5 of Job 6"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706795880000,
        "Id": 10,
        "Job": 7,
        "RoomId": 10,
        "StartTime": 1706793960000,
        "Subject": "Task 7 of Job 7"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706805600000,
        "Id": 10,
        "Job": 6,
        "RoomId": 10,
        "StartTime": 1706801280000,
        "Subject": "Task 6 of Job 6"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706805300000,
        "Id": 9,
        "Job": 5,
        "RoomId": 9,
        "StartTime": 1706801280000,
        "Subject": "Task 7 of Job 5"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706806140000,
        "Id": 3,
        "Job": 1,
        "RoomId": 3,
        "StartTime": 1706802600000,
        "Subject": "Task 3 of Job 1"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706804280000,
        "Id": 2,
        "Job": 2,
        "RoomId": 2,
        "StartTime": 1706802600000,
        "Subject": "Task 6 of Job 2"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706809140000,
        "Id": 9,
        "Job": 10,
        "RoomId": 9,
        "StartTime": 1706805300000,
        "Subject": "Task 5 of Job 10"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706814480000,
        "Id": 9,
        "Job": 7,
        "RoomId": 9,
        "StartTime": 1706809140000,
        "Subject": "Task 8 of Job 7"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706813700000,
        "Id": 10,
        "Job": 10,
        "RoomId": 10,
        "StartTime": 1706809140000,
        "Subject": "Task 6 of Job 10"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706817600000,
        "Id": 9,
        "Job": 4,
        "RoomId": 9,
        "StartTime": 1706814480000,
        "Subject": "Task 6 of Job 4"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706809860000,
        "Id": 4,
        "Job": 1,
        "RoomId": 4,
        "StartTime": 1706807100000,
        "Subject": "Task 4 of Job 1"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706814420000,
        "Id": 7,
        "Job": 2,
        "RoomId": 7,
        "StartTime": 1706811660000,
        "Subject": "Task 7 of Job 2"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706808240000,
        "Id": 8,
        "Job": 5,
        "RoomId": 8,
        "StartTime": 1706805300000,
        "Subject": "Task 8 of Job 5"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706800920000,
        "Id": 6,
        "Job": 8,
        "RoomId": 6,
        "StartTime": 1706796480000,
        "Subject": "Task 4 of Job 8"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706810040000,
        "Id": 5,
        "Job": 8,
        "RoomId": 5,
        "StartTime": 1706808120000,
        "Subject": "Task 5 of Job 8"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706810160000,
        "Id": 6,
        "Job": 9,
        "RoomId": 6,
        "StartTime": 1706807100000,
        "Subject": "Task 4 of Job 9"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706812980000,
        "Id": 5,
        "Job": 1,
        "RoomId": 5,
        "StartTime": 1706810040000,
        "Subject": "Task 5 of Job 1"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706815260000,
        "Id": 3,
        "Job": 9,
        "RoomId": 3,
        "StartTime": 1706810160000,
        "Subject": "Task 5 of Job 9"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706822700000,
        "Id": 8,
        "Job": 4,
        "RoomId": 8,
        "StartTime": 1706817600000,
        "Subject": "Task 7 of Job 4"
    },
    {
        "Description": "Machine 2",
        "EndTime": 1706809740000,
        "Id": 2,
        "Job": 3,
        "RoomId": 2,
        "StartTime": 1706804280000,
        "Subject": "Task 1 of Job 3"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706808420000,
        "Id": 1,
        "Job": 6,
        "RoomId": 1,
        "StartTime": 1706805600000,
        "Subject": "Task 7 of Job 6"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706819700000,
        "Id": 7,
        "Job": 8,
        "RoomId": 7,
        "StartTime": 1706814420000,
        "Subject": "Task 6 of Job 8"
    },
    {
        "Description": "Machine 1",
        "EndTime": 1706814840000,
        "Id": 1,
        "Job": 3,
        "RoomId": 1,
        "StartTime": 1706809740000,
        "Subject": "Task 2 of Job 3"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706815920000,
        "Id": 10,
        "Job": 9,
        "RoomId": 10,
        "StartTime": 1706815260000,
        "Subject": "Task 6 of Job 9"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706824500000,
        "Id": 8,
        "Job": 7,
        "RoomId": 8,
        "StartTime": 1706822700000,
        "Subject": "Task 9 of Job 7"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706817180000,
        "Id": 4,
        "Job": 3,
        "RoomId": 4,
        "StartTime": 1706814840000,
        "Subject": "Task 3 of Job 3"
    },
    {
        "Description": "Machine 3",
        "EndTime": 1706821620000,
        "Id": 3,
        "Job": 3,
        "RoomId": 3,
        "StartTime": 1706817180000,
        "Subject": "Task 4 of Job 3"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706820240000,
        "Id": 10,
        "Job": 5,
        "RoomId": 10,
        "StartTime": 1706815920000,
        "Subject": "Task 9 of Job 5"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706824920000,
        "Id": 9,
        "Job": 8,
        "RoomId": 9,
        "StartTime": 1706819700000,
        "Subject": "Task 7 of Job 8"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706823600000,
        "Id": 7,
        "Job": 6,
        "RoomId": 7,
        "StartTime": 1706819700000,
        "Subject": "Task 8 of Job 6"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706826000000,
        "Id": 7,
        "Job": 9,
        "RoomId": 7,
        "StartTime": 1706823600000,
        "Subject": "Task 7 of Job 9"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706827800000,
        "Id": 10,
        "Job": 8,
        "RoomId": 10,
        "StartTime": 1706824920000,
        "Subject": "Task 8 of Job 8"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706827800000,
        "Id": 5,
        "Job": 7,
        "RoomId": 5,
        "StartTime": 1706824500000,
        "Subject": "Task 10 of Job 7"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706816520000,
        "Id": 6,
        "Job": 10,
        "RoomId": 6,
        "StartTime": 1706813700000,
        "Subject": "Task 7 of Job 10"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706819280000,
        "Id": 6,
        "Job": 2,
        "RoomId": 6,
        "StartTime": 1706816520000,
        "Subject": "Task 8 of Job 2"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706830320000,
        "Id": 9,
        "Job": 3,
        "RoomId": 9,
        "StartTime": 1706824920000,
        "Subject": "Task 5 of Job 3"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706830920000,
        "Id": 6,
        "Job": 3,
        "RoomId": 6,
        "StartTime": 1706830320000,
        "Subject": "Task 6 of Job 3"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706831580000,
        "Id": 6,
        "Job": 1,
        "RoomId": 6,
        "StartTime": 1706830920000,
        "Subject": "Task 6 of Job 1"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706829180000,
        "Id": 7,
        "Job": 5,
        "RoomId": 7,
        "StartTime": 1706826000000,
        "Subject": "Task 10 of Job 5"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706835300000,
        "Id": 7,
        "Job": 1,
        "RoomId": 7,
        "StartTime": 1706831580000,
        "Subject": "Task 7 of Job 1"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706831340000,
        "Id": 8,
        "Job": 9,
        "RoomId": 8,
        "StartTime": 1706826000000,
        "Subject": "Task 8 of Job 9"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706831940000,
        "Id": 8,
        "Job": 3,
        "RoomId": 8,
        "StartTime": 1706831340000,
        "Subject": "Task 7 of Job 3"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706836260000,
        "Id": 8,
        "Job": 2,
        "RoomId": 8,
        "StartTime": 1706831940000,
        "Subject": "Task 9 of Job 2"
    },
    {
        "Description": "Machine 7",
        "EndTime": 1706840640000,
        "Id": 7,
        "Job": 3,
        "RoomId": 7,
        "StartTime": 1706835300000,
        "Subject": "Task 8 of Job 3"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706839620000,
        "Id": 8,
        "Job": 1,
        "RoomId": 8,
        "StartTime": 1706836260000,
        "Subject": "Task 8 of Job 1"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706820300000,
        "Id": 4,
        "Job": 10,
        "RoomId": 4,
        "StartTime": 1706817180000,
        "Subject": "Task 8 of Job 10"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706831160000,
        "Id": 5,
        "Job": 6,
        "RoomId": 5,
        "StartTime": 1706827800000,
        "Subject": "Task 9 of Job 6"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706828580000,
        "Id": 4,
        "Job": 4,
        "RoomId": 4,
        "StartTime": 1706822700000,
        "Subject": "Task 8 of Job 4"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706841480000,
        "Id": 9,
        "Job": 2,
        "RoomId": 9,
        "StartTime": 1706836260000,
        "Subject": "Task 10 of Job 2"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706841120000,
        "Id": 8,
        "Job": 6,
        "RoomId": 8,
        "StartTime": 1706839620000,
        "Subject": "Task 10 of Job 6"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706836560000,
        "Id": 5,
        "Job": 10,
        "RoomId": 5,
        "StartTime": 1706831160000,
        "Subject": "Task 9 of Job 10"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706843280000,
        "Id": 8,
        "Job": 8,
        "RoomId": 8,
        "StartTime": 1706841120000,
        "Subject": "Task 9 of Job 8"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706829900000,
        "Id": 10,
        "Job": 4,
        "RoomId": 10,
        "StartTime": 1706828580000,
        "Subject": "Task 9 of Job 4"
    },
    {
        "Description": "Machine 8",
        "EndTime": 1706845980000,
        "Id": 8,
        "Job": 10,
        "RoomId": 8,
        "StartTime": 1706843280000,
        "Subject": "Task 10 of Job 10"
    },
    {
        "Description": "Machine 6",
        "EndTime": 1706834160000,
        "Id": 6,
        "Job": 4,
        "RoomId": 6,
        "StartTime": 1706831580000,
        "Subject": "Task 10 of Job 4"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706845740000,
        "Id": 10,
        "Job": 3,
        "RoomId": 10,
        "StartTime": 1706840640000,
        "Subject": "Task 9 of Job 3"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706844120000,
        "Id": 9,
        "Job": 1,
        "RoomId": 9,
        "StartTime": 1706841480000,
        "Subject": "Task 9 of Job 1"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706838120000,
        "Id": 5,
        "Job": 9,
        "RoomId": 5,
        "StartTime": 1706836560000,
        "Subject": "Task 9 of Job 9"
    },
    {
        "Description": "Machine 9",
        "EndTime": 1706848560000,
        "Id": 9,
        "Job": 9,
        "RoomId": 9,
        "StartTime": 1706844120000,
        "Subject": "Task 10 of Job 9"
    },
    {
        "Description": "Machine 4",
        "EndTime": 1706848020000,
        "Id": 4,
        "Job": 8,
        "RoomId": 4,
        "StartTime": 1706843280000,
        "Subject": "Task 10 of Job 8"
    },
    {
        "Description": "Machine 10",
        "EndTime": 1706850300000,
        "Id": 10,
        "Job": 1,
        "RoomId": 10,
        "StartTime": 1706845740000,
        "Subject": "Task 10 of Job 1"
    },
    {
        "Description": "Machine 5",
        "EndTime": 1706847720000,
        "Id": 5,
        "Job": 3,
        "RoomId": 5,
        "StartTime": 1706845740000,
        "Subject": "Task 10 of Job 3"
    }
]

if(!status){
response=data
}

localStorage.removeItem('toolChangeSchedule');

  this.scheduleSource.next(response);
  // Save the response data to local storage
  localStorage.setItem('scheduleData', JSON.stringify(response));
  const datatest=response;
  this.scheduleData2 = datatest.map((item: { StartTime: string | number | Date; EndTime: string | number | Date; }) => ({
   ...item,
   StartTime: this.convertToDateString(new Date(item.StartTime)),
   EndTime: this.convertToDateString(new Date(item.EndTime))
 }));



  // Update the BehaviorSubject with the new data
  
  console.log(this.scheduleData2)
  if(!!status){
    this.notifyUploadComplete(this.scheduleData2);
  }
 



  this.scheduleData2.forEach(task => {
   const toolIdMatch = task.Subject.match(/Job (\d+)/);
   if (toolIdMatch) {
     const toolId = parseInt(toolIdMatch[1], 10);
     const taskDuration = this.getDurationInMinutes(task.StartTime, task.EndTime);
 
     this.accumulatedTime[toolId] = (this.accumulatedTime[toolId] || 0) + taskDuration;
 
     if (this.accumulatedTime[toolId] >= this.toolLifespan[toolId]) {
       const overTime = this.accumulatedTime[toolId] - this.toolLifespan[toolId];
       const changeTime = new Date(new Date(task.EndTime).getTime() - overTime * 60 * 1000);
 
       this.toolChangeSchedule.push({
         ToolID: toolId,
         ChangeTime: this.formatDate(changeTime),
         Machine: task.Description,
       });
 
       this.accumulatedTime[toolId] -= this.toolLifespan[toolId]; // Reset the accumulated time for the tool after change
     }
   }
 });
 
 console.log(this.toolChangeSchedule);
 localStorage.setItem('toolChangeSchedule', JSON.stringify(this.toolChangeSchedule));

}





 
}
