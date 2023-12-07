import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrackService } from '../track.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [TrackService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private trackService: TrackService, private authService: AuthService, private router: Router) {
    this.trackService.getStatus().subscribe(res => {
      this.updateList = res;
      this.currentStatus = res.length > 0 ? res[res.length - 1].status : '';
    })
  }

  currentStatus = 'Estatus 1';
  newStatus = '';
  updateList: { status: string, location: string }[] = [];

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
      this.trackService.addStatus(this.newStatus, location).subscribe(()=> {
        this.newStatus = '';
        this.trackService.getStatus().subscribe(res => {
          this.updateList = res;
          this.currentStatus = res.length > 0 ? res[res.length - 1].status : '';
        })
      });
    });
  }

  logout(){
    this.authService.logout().subscribe(()=> {
      this.router.navigate(['/signin']);
      localStorage.removeItem('userId');
    })
  }
}
