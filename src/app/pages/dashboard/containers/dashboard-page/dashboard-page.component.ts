import { Component ,OnInit,ViewChild} from '@angular/core';
import { Observable } from 'rxjs';

import { DashboardService } from '../../services';
import {
  DailyLineChartData,
  PerformanceChartData,
  ProjectStatData,
  RevenueChartData,
  ServerChartData,
  SupportRequestData,
  VisitsChartData
} from '../../models';

import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent  implements OnInit {
  public projectsStatsData$: Observable<ProjectStatData>;
  scheduleData2 :any[]=[] ;
  

  totalData:any[]=[];

  constructor(private service: DashboardService) {
    this.projectsStatsData$ = this.service.loadProjectsStatsData();
  }
  public data: any[] = [
    { x: 'Robotic Cell 1', y: 75, tooltipMappingName: 'Robotic Cell 1', color: '#98AFC7',active:0,idle:0 },
    { x: 'Robotic Cell 2', y: 76, tooltipMappingName: 'Robotic Cell 2', color: '#99c68e' ,active:0,idle:0 },
    { x: 'Robotic Cell 3', y: 77, tooltipMappingName: 'Robotic Cell 3', color: '#C2B280',active:0,idle:0  },
    { x: 'Robotic Cell 4', y: 78, tooltipMappingName: 'Robotic Cell 4', color: '#3090C7' ,active:0,idle:0 },
    { x: 'Robotic Cell 5', y: 79, tooltipMappingName: 'Robotic Cell 5', color: '#92b92b' ,active:0,idle:0 },
    { x: 'Robotic Cell 6', y: 80, tooltipMappingName: 'Robotic Cell 6', color: '#95b9c7' ,active:0,idle:0 },
    { x: 'Robotic Cell 7', y: 85, tooltipMappingName: 'Robotic Cell 7', color: '#deb887' ,active:0,idle:0 },
    { x: 'Robotic Cell 8', y: 90, tooltipMappingName: 'Robotic Cell 8', color: '#5D8AA8' ,active:0,idle:0 },
    { x: 'Robotic Cell 9', y: 95, tooltipMappingName: 'Robotic Cell 9', color: '#8A2BE2' ,active:0,idle:0 },
    { x: 'Robotic Cell 10', y: 100, tooltipMappingName: 'Robotic Cell 10', color: '#778899' ,active:0,idle:0 }
  ];


  convertToDateString(date:any) {
    const year = date.getFullYear();
    const month = date.getMonth(); // No +1 since we want zero-based month index for the Date constructor
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
  
    return new Date(year,month,day,hours,minutes);
  }
  
  ngOnInit() {
    const tasks = localStorage.getItem('scheduleData');
    if (tasks) {
      const parsedData = JSON.parse(tasks);
  
      // Convert StartTime and EndTime back to Date objects
      this.scheduleData2 = parsedData.map(item => ({
        ...item,
        StartTime: new Date(item.StartTime).getTime(), // Directly convert to timestamp
        EndTime: new Date(item.EndTime).getTime() // Directly convert to timestamp
      }));
  
      // Calculating utilization for each machine
      const machineUtilization = {};

      let totalMachines = new Set();
const totalJobs = new Set();
this.scheduleData2.forEach(task => {
    totalMachines.add(task.Id);
    totalJobs.add(task.Job);
});

const totalTasks = this.scheduleData2.length;
      this.scheduleData2.forEach(task => {
        const { Id, StartTime, EndTime } = task;
  
        if (!machineUtilization[Id]) {
          machineUtilization[Id] = {
            workingTime: 0,
            lastEndTime: 0,
            firstStartTime: Infinity // Initialize with Infinity to find the minimum start time
          };
        }
  
        machineUtilization[Id].workingTime += (EndTime - StartTime); // Accumulate working time
        machineUtilization[Id].lastEndTime = Math.max(machineUtilization[Id].lastEndTime, EndTime);
        machineUtilization[Id].firstStartTime = Math.min(machineUtilization[Id].firstStartTime, StartTime);
      });
  
      // Finalize idle time calculation
      Object.keys(machineUtilization).forEach(machineId => {
        const machine = machineUtilization[machineId];
        const totalAvailableTime = machine.lastEndTime - machine.firstStartTime;
        machine.idleTime = totalAvailableTime - machine.workingTime; // Correct idle time calculation
        machine.utilization = (machine.workingTime / totalAvailableTime) * 100; // Utilization percentage
      });
  
      // Update data array with utilization, active, and idle times
      this.data = this.data.map(cell => {
        const machineId = parseInt(cell.x.split(' ')[2]); // Extract machine ID
        if (machineUtilization[machineId]) {
          const { workingTime, idleTime, utilization } = machineUtilization[machineId];
          return {
            ...cell,
            y: parseFloat(utilization.toFixed(2)),
            active: workingTime,
            idle: idleTime
          };
        }
        return cell;
      });
  
      console.log('Machine Utilization:', machineUtilization);
      console.log('Updated Data:', this.data);
      console.log('Total Machines:', totalMachines.size);
console.log('Total Jobs:', totalJobs.size);
console.log('Total Tasks:', totalTasks);




    }
  }
  
public chart: ChartComponent;
//Initializing Primary X Axis
public primaryXAxis: Object = {
    valueType: 'Category',
    interval: 1,
    majorGridLines: { width: 0 },
    labelIntersectAction: Browser.isDevice ? 'None' : 'Trim',
    labelRotation: Browser.isDevice ? -45 : 0,
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 }
};
//Initializing Primary Y Axis
public primaryYAxis: Object = {
    title: 'Usage',
    majorTickLines: { width: 0 },
    lineStyle: { width: 0 },
    maximum: 100,
    interval: 5
};
// custom code start
public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
};
// custom code end
public chartArea: Object = {
    border: {
        width: 0
    }
};
public width: string = Browser.isDevice ? '100%' : '75%';
public title: string = 'Robotic Cell Utilization';
public tooltip: Object = {
  enable: true,
  header: "<b>${point.x}</b>", // Use point.x to display the name of the Robotic Cell

 }

 public onTooltipRender(args: any): void {
  // Extracting the point data from the arguments
  const pointData = args.series.dataSource[args.point.index];

  // Formatting the active and idle times for display
  const activeTimeFormatted = this.formatTime(pointData.active);
  const idleTimeFormatted = this.formatTime(pointData.idle);

  // Setting the custom tooltip content
  args.text = `Utilization: <b>${pointData.y.toFixed(2)}%</b><br/>Active Time: <b>${activeTimeFormatted}</b><br/>Idle Time: <b>${idleTimeFormatted}</b>`;
}

// Helper function to format time from milliseconds to a more readable format (hours, minutes, seconds)
public formatTime(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  const daysPart = days > 0 ? `${days}d ` : '';
  const hoursPart = (hours % 24) > 0 ? `${hours % 24}h ` : '';
  const minutesPart = (minutes % 60) > 0 ? `${minutes % 60}m ` : '';
  const secondsPart = (seconds % 60) > 0 ? `${seconds % 60}s` : '';

  return `${daysPart}${hoursPart}${minutesPart}${secondsPart}` || '0s';
}




}
