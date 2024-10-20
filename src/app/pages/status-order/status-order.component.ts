import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './status-order.component.html',
  styleUrl: './status-order.component.css',
})
export class StatusOrderComponent implements OnInit {
  bills: any[] = [];
  billDetails: any[] = [];

  selectedBillId: number | null = null;
  userId: number | null = null;

  constructor(private appService: AppService) {}
  ngOnInit(): void {
    this.loadCurrentUser();
  }
  // Lấy thông tin người dùng hiện tại
  loadCurrentUser(): void {
    this.appService.getCurrentUser().subscribe(
      (response: any) => {
        this.userId = response.id; // Lưu userId sau khi lấy được
        this.loadBills(); // Gọi hàm loadBills sau khi có userId
      },
      (error: any) => {
        console.error('Failed to load current user:', error);
      }
    );
  }
  // Hàm lấy danh sách hóa đơn
  loadBills(): void {
    if (this.userId) {
      this.appService.getBillsByUserId(this.userId).subscribe(
        (response: any) => {
          this.bills = response;
        },
        (error: any) => {
          console.error('Failed to load bills:', error);
        }
      );
    }
  }
  // Hàm để lấy chi tiết hóa đơn và hiển thị trong trang hiện tại
  viewDetails(billId: number) {
    this.selectedBillId = billId;
    this.appService.getBillDetails(billId).subscribe(
      (response: any) => {
        this.billDetails = response; // Lưu chi tiết hóa đơn để hiển thị
      },
      (error: any) => {
        console.error('Failed to load bill details:', error);
      }
    );
  }

  // Hàm để xác nhận trước khi xóa
  confirmDelete(billId: number): void {
    const confirmDelete = window.confirm('Bạn có muốn hủy hóa đơn này không?');
    if (confirmDelete) {
      this.deleteBill(billId); // Nếu người dùng xác nhận, tiến hành xóa hóa đơn
    }
  }

  // Hàm để xóa hóa đơn
  deleteBill(billId: number): void {
    this.appService.deleteBill(billId).subscribe(
      () => {
        // Xóa hóa đơn thành công, cập nhật lại danh sách hóa đơn
        this.bills = this.bills.filter((bill) => bill.id !== billId);
        alert('Hóa đơn đã được hủy thành công.');
      },
      (error: any) => {
        console.error('Failed to delete bill:', error);
        alert('Xóa hóa đơn thất bại. Vui lòng thử lại sau.');
      }
    );
  }
}
