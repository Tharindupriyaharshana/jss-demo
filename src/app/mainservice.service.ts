import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


interface ApiResponse {
  data: any[];
  start: string;
  end: string;
}

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  private scheduleSource = new BehaviorSubject<any[]>([]);
  currentSchedule = this.scheduleSource.asObservable();

 constructor(private http: HttpClient) { 
  // localStorage.setItem('scheduleData', JSON.stringify(roomData1));
 }

 uploadFile(file: File) {
   alert("Uploading !")
   const formData: FormData = new FormData();
   formData.append('file', file, file.name);

   this.http.post<ApiResponse>('http://127.0.0.1:5000/upload', formData).subscribe(
     response => {
       console.log(response);

       // Save the response data to local storage
       localStorage.setItem('scheduleData', JSON.stringify(response));

       // Update the BehaviorSubject with the new data
       this.scheduleSource.next(response.data);

       alert("Repsone Came")
     },
     error => {
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

 
}
