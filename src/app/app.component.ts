import { Component } from '@angular/core';
import { IconOptions } from '@angular/material/icon';
import { MAT_TOOLTIP_DEFAULT_OPTIONS } from '@angular/material/tooltip';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private newtitle:Title){
    newtitle.setTitle('Jabonics');
  }

}
