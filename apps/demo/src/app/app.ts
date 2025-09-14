import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgxSeoToolkit } from 'ngx-seo-toolkit';

@Component({
  imports: [NgxSeoToolkit, RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'demo';
}
