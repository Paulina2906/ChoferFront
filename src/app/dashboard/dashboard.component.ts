import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentStatus = 'Estatus 1';
  statusList = [
    'Estatus 1',
    'Estatus 2',
    'Estatus 3',
    'Estatus 4',
    'Estatus 5',
    'Estatus 6',
    'Estatus 7',
    'Estatus 8',
  ];
}
