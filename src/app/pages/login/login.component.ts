import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    // Tạo form với các kiểm tra
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Hàm xử lý khi nhấn nút Đăng Nhập
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.appService.login(loginData).subscribe(
        (response: any) => {
          console.log('Login successful', response);
          // Lưu token vào localStorage hoặc sessionStorage nếu cần
          localStorage.setItem('token', response.token);
          // Điều hướng đến trang khác sau khi đăng nhập thành công
          this.router.navigate(['/']);
        },
        (error: any) => {
          console.error('Login failed', error);
        }
      );
    } else {
      // Nếu form không hợp lệ, đánh dấu tất cả các trường đã chạm vào để hiển thị lỗi
      this.loginForm.markAllAsTouched();
    }
  }
}
