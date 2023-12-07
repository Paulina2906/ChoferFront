import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackService } from '../track.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [TrackService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private trackService: TrackService, private authService: AuthService, private router: Router) {
    this.trackService.getStatus().subscribe(res => {
      this.currentStatus = res.status;
    })
  }

  currentStatus = 'Estatus 1';
  selection = '';
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

  update() {
    if(!navigator.geolocation) {
      alert('Navigator do not support geolocation');
    }
    let location = { lat: 0, long: 0 };
    navigator.geolocation.getCurrentPosition((pos)=> {
      location = {
        lat: pos.coords.latitude,
        long: pos.coords.longitude
      }
      this.currentStatus = this.selection;
      this.trackService.updateStatus(this.currentStatus, location).subscribe();
    });
  }

  logout(){
    this.authService.logout().subscribe(()=> {
      this.router.navigate(['/signin']);
      localStorage.removeItem('userId');
    })
  }
}
