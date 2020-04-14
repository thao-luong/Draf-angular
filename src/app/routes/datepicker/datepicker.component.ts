import { Component, OnInit } from '@angular/core';
import { DatePickerComponent } from '../../components/date-picker/date-picker.component';
import  DatePickerComponentSRC  from '!!raw-loader!../../components/date-picker/date-picker.component.ts';
import  DatePickerComponentHTML  from '!!raw-loader!../../components/date-picker/date-picker.component.html';
import  DatePickerComponentCSS  from '!!raw-loader!../../components/date-picker/date-picker.component.css';

import { MonthPickerComponent } from '../../components/month-picker/month-picker.component';
import  MonthPickerComponentSRC  from '!!raw-loader!../../components/date-picker/date-picker.component.ts';
import  MonthPickerComponentHTML  from '!!raw-loader!../../components/date-picker/date-picker.component.html';
import  MonthPickerComponentCSS  from '!!raw-loader!../../components/date-picker/date-picker.component.css';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  constructor() {}

  datepickerComponentArray = [
    {
      title: 'Date Picker',
      content: 'This is an example of two custom date picker components filtering a visualization by absolute date.',
      for: DatePickerComponent,
      ts: DatePickerComponentSRC,
      html: DatePickerComponentHTML,
      css: DatePickerComponentCSS
    },
    {
      title: 'Month Picker',
      content: 'This is an example of two custom month picker components filtering a visualization by relative date.',
      for: MonthPickerComponent,
      ts: MonthPickerComponentSRC,
      html: MonthPickerComponentHTML,
      css: MonthPickerComponentCSS
    }
  ]

  ngOnInit() {
  }
}