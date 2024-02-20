import { Component, OnInit, ViewChild } from '@angular/core';
import { MainserviceService } from '../../../mainservice.service';
import { FileInfo, RemovingEventArgs, SelectedEventArgs, UploaderComponent } from '@syncfusion/ej2-angular-inputs';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { isNullOrUndefined, EmitType } from '@syncfusion/ej2-base';
import { Router } from '@angular/router';

import { Subscription, timer } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  selectedFile: File | null = null;  // Allow selectedFile to be File or null
  isLoading: boolean = false;
  showResult: boolean = false;
  timeout: boolean = false;
  fileName: string = '';

  timeLeft: number ;
  responseReceived: boolean = false;
  private countdownSub: Subscription;


  constructor(private uploadService: MainserviceService,private router: Router) { }
  ngOnInit(): void {
    this.timeleft()
    throw new Error('Method not implemented.');
   
  }
  
timeleft(){
this.timeLeft=30;
}
  showSchedule() {
    this.router.navigate(['/schedule']);
  }
  onFileChanged(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
      this.fileName = fileList[0].name;
    } else {
      this.selectedFile = null;  // Explicitly set to null when no files are selected
    }
  }
  
  onUpload() {
    if (!this.selectedFile) return; // Ensure a file is selected
    this.isLoading = true;
    this.timeout = false; 
    this.timeleft()// Start loading
    this.startCountdown();

    this.uploadService.uploadFile(this.selectedFile);
   
        this.uploadService.uploadComplete$.subscribe(
          data => {
            console.log('Upload completed', data);
            if (this.countdownSub) {
              this.countdownSub.unsubscribe();
            }
            this.isLoading = false; 
            this.showResult=true;
          }
        );
     
  
  }


  ngOnDestroy() {
    if (this.countdownSub) {
      this.countdownSub.unsubscribe();
    }
  }
 

  startCountdown() {
    this.countdownSub = timer(0, 1000).pipe( // Emit every 1000ms (1 second)
      take(this.timeLeft)
    ).subscribe({
      next: () => {
        this.timeLeft -= 1; // Decrement timeLeft by 1 each second
        if (this.timeLeft === 0) {
          this.isLoading = false; 
          this.showResult=false;
          this.timeout=true// Set isLoading to false when timeLeft is 0
          // Optionally, show the "please try again" message or handle as needed
        }
      },
      error: (error) => {
        console.error(error);
        this.isLoading = false; // Ensure isLoading is set to false in case of error
      },
      complete: () => {
        // This is called after the observable completes
        // If the countdown completes without a response, you can handle that here
        if (!this.responseReceived) {
          // Show the "please try again" message or handle as needed
        }
      }
    });
  }
  

 

}
