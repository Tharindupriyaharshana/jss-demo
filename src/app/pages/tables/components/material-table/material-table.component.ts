import { Component, Input, OnInit } from '@angular/core';

import { Customer } from '../../models';
import { EventRenderedArgs, View } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss']
})
export class MaterialTableComponent implements OnInit {
  @Input() materialTableDate: any[];
  public displayedColumns: string[] = ['ToolID', 'Machine', 'ChangeTime'];
  public dataSource: any[];
  public selectedDate: Date = new Date(1706742205000);
  public currentView: View = 'Day';
  public ngOnInit() {
    this.dataSource = this.materialTableDate;
    this.dataSource = this.materialTableDate.map((item: any) => ({
      Id: item.ToolID,
      Subject: `Tool ${item.ToolID} on ${item.Machine}`,
      StartTime: new Date(item.ChangeTime),
      EndTime: new Date(new Date(item.ChangeTime).getTime() + 30 * 60000), // Assuming each change takes 30 minutes
      IsAllDay: false
    }));
  }

  public onEventRendered(args: any): void {

    console.log(args)
    // Define an array of colors
    const colors = [
      '#98AFC7', // Color for machine 1
      '#95b9c7', // Color for machine 2
      '#C2B280', // Color for machine 3
      '#3090C7', // Color for machine 4
      '#92b92b', // Color for machine 5
      '#99c68e',, // Color for machine 6
      '#deb887', // Color for machine 7
      '#5D8AA8', // Color for machine 8
      '#8A2BE2', // Color for machine 9
      '#98AFC7'  // Color for machine 10
    ];
  
    // Extract machine number from the Subject
    const subject = args.data.Subject;
    const machineMatch = subject.match(/Machine (\d+)/);
    const machineNumber = machineMatch ? parseInt(machineMatch[1], 10) : null;
  
    // Check if the machine number is valid and between 1 and 10
    if (machineNumber && machineNumber >= 1 && machineNumber <= 10) {
      // Use the machine number as an index to select the color from the array
      // Note: Subtract 1 to align with array indexing (0-9 for machines 1-10)
      args.element.style.backgroundColor = colors[machineNumber - 1];
    }
  }
  
  
}
