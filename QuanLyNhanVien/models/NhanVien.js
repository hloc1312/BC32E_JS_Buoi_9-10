// tạo kiểu dữ liệu Nhân viên
function NhanVien() {
  this.taiKhoan = "";
  this.hoTen = "";
  this.email = "";
  this.matKhau = "";
  this.ngayLam = "";
  this.luongCoBan = 0;
  this.chucVu = "";
  this.gioLamTrongThang = 0;
  this.tongLuong = function () {
    var tong = 0;
    if (this.chucVu === "Sếp") {
      tong = this.luongCoBan * 3;
    } else if (this.chucVu === "Trưởng phòng") {
      tong = this.luongCoBan * 2;
    } else if (this.chucVu === "Nhân viên") {
      tong = this.luongCoBan * 1;
    }
    return tong;
  };
  this.loaiNhanVien = function () {
    var xepLoai = "";
    if (this.gioLamTrongThang >= 192) {
      xepLoai = "xuất sắc";
    } else if (this.gioLamTrongThang >= 176 && this.gioLamTrongThang < 192) {
      xepLoai = "giỏi";
    } else if (this.gioLamTrongThang >= 160 && this.gioLamTrongThang < 176) {
      xepLoai = "khá";
    } else {
      xepLoai = "trung bình";
    }
    return xepLoai;
  };
}
