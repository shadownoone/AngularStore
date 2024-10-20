import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  user: any = null;
  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.appService.getCurrentUser().subscribe(
      (response: any) => {
        this.user = response; // Lưu thông tin người dùng
      },
      (error: any) => {
        console.error('Error fetching user info:', error);
      }
    );
  }
}
