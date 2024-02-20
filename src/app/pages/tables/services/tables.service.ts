import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import {Customer, Employee} from '../models';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  public loadEmployeeTableData(): Observable<Employee[]> {
    return of([
      {name: 'Joe James', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'John Walsh', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Bob Herm', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'James Houston', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Prabhakar Linwood', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Kaui Ignace', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Esperanza Susanne', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Christian Birgitte', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'Meral Elias', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Deep Pau', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Sebastiana Hani', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Marciano Oihana', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Brigid Ankur', company: 'Example Inc.', city: 'Dallas', state: 'TX'},
      {name: 'Anna Siranush', company: 'Example Inc.', city: 'Yonkers', state: 'NY'},
      {name: 'Avram Sylva', company: 'Example Inc.', city: 'Hartford', state: 'CT'},
      {name: 'Serafima Babatunde', company: 'Example Inc.', city: 'Tampa', state: 'FL'},
      {name: 'Gaston Festus', company: 'Example Inc.', city: 'Tampa', state: 'FL'}
    ]);
  }

  get scheduleData() {
    const dataString = localStorage.getItem('toolChangeSchedule');
    if (dataString) {
      try {
        console.log(JSON.parse(dataString));
        return JSON.parse(dataString);
      } catch (e) {
        console.error('Error parsing schedule data from localStorage', e);
        return []; // Return an empty array in case of error
      }
    }
    return []; // Return an empty array if localStorage item is not found
  }


  // public loadMaterialTableData(): Observable<any[]> {
   
  //   return of([
  //     {
  //       Tool: 'Grinder',
  //       RoboticCell: '2',
  //       Time: '10.43 am ',
  //       Status: 'required'
  //     },
  //     {
  //       Tool: 'Cutter',
  //       RoboticCell: '2',
  //       Time: '10.43 am ',
  //       Status: 'nice to have'
  //     },
  //     {
  //       Tool: 'Cutter',
  //       RoboticCell: '2',
  //       Time: '10.43 am ',
  //       Status: 'no need'
  //     },
      
      
  //   ]);
  // }

  public loadMaterialTableData(): Observable<any[]> {
    const dataString = localStorage.getItem('toolChangeSchedule');
  
    if (dataString) {
      try {
        const data = JSON.parse(dataString);
        return of(data); // Use 'of' to return an observable
      } catch (e) {
        console.error('Error parsing schedule data from localStorage', e);
      }
    }
  
    return of([]); // Return an empty observable array if there's no data
  }

}
