import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../../services/app.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.checkPasswords }
    );
  }

  // Hàm kiểm tra mật khẩu và xác nhận mật khẩu
  checkPasswords(group: FormGroup) {
    let pass = group.get('password')?.value;
    let confirmPass = group.get('confirmPassword')?.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  // Gửi yêu cầu đăng ký
  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      this.appService.register(formData).subscribe(
        (response: any) => {
          // Xử lý phản hồi thành công
          console.log('Đăng ký thành công', response);
          this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập sau khi đăng ký thành công
        },
        (error: any) => {
          // Xử lý lỗi
          console.error('Lỗi đăng ký:', error);
        }
      );
    } else {
      // Nếu form không hợp lệ, đánh dấu các trường để hiển thị lỗi
      this.registerForm.markAllAsTouched();
    }
  }
}
