var arrNhanVien = [];

// Thêm mới nhân viên
document.querySelector("#btnThemNV").onclick = function () {
  // tạo đối tượng
  var nv = new NhanVien();

  // lấy thông tin từ người dùng
  nv.taiKhoan = document.querySelector("#tknv").value;
  nv.hoTen = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.matKhau = document.querySelector("#password").value;

  //   xử lý ngày vào làm

  nv.ngayLam = document.querySelector("#datepicker").value;
  //   nv.ngayLam = moment(xuLyNgay).format("DD/MM/YYYY");
  nv.luongCoBan = document.querySelector("#luongCB").value;
  nv.chucVu = document.querySelector("#chucvu").value;
  nv.gioLamTrongThang = document.querySelector("#gioLam").value;

  // Kiểm tra trước khi thêm nhân viên

  var valid = true;

  //   KIỂM TRA RỖNG
  valid &=
    kiemTraRong(nv.taiKhoan, "#error_required_taiKhoan", "Tài khoản") &
    kiemTraRong(nv.hoTen, "#error_required_hoTen", "Tên nhân viên") &
    kiemTraRong(nv.email, "#error_required_email", "Email") &
    kiemTraRong(nv.matKhau, "#error_required_matKhau", "Mật khẩu") &
    kiemTraRong(nv.ngayLam, "#error_required_ngayLam", "Ngày làm") &
    kiemTraRong(nv.luongCoBan, "#error_required_luongCoBan", "Lương cơ bản") &
    kiemTraRong(
      nv.gioLamTrongThang,
      "#error_required_gioLamTrongThang",
      "Giờ làm trong tháng"
    ) &
    kiemTraChucVu(nv.chucVu, "#tbChucVu", "Chức vụ");

  // KIỂM TRA ĐỊNH DẠNG
  valid &=
    kiemTraDoDaKyTu(nv.taiKhoan, "#error_min_max_taiKhoan", "Tài khoản", 4, 6) &
    kiemTraTatCaChu(nv.hoTen, "#error_allLetter_hoTen", "Tên nhân viên") &
    kiemTraEmail(nv.email, "#error_email", "Email") &
    kiemTraMatKhau(nv.matKhau, "#error_matKhau", "Mật khẩu", 6, 10) &
    kiemTraNgay(nv.ngayLam, "#error_ngayLam", "Ngày làm") &
    kiemTraLuongCB(
      nv.luongCoBan,
      "#error_luongCoBan",
      "Lương cơ bản",
      1000000,
      20000000
    ) &
    kiemTraGioLamTrongThang(
      nv.gioLamTrongThang,
      "#tbGiolam",
      "Giờ vào làm",
      80,
      200
    );
  if (!valid) {
    return;
  }
  //   console.log(nv);
  // Thêm nhân viên vào mảng
  arrNhanVien.push(nv);

  //   Gọi hàm từ mảng nhân viên tạo ra html cho table
  renderTableNhanVien(arrNhanVien);

  //   Lưu vào localStorage
  luuLocalStorage();
};

/**
 *
 * @param {*} arrInput là 1 mảng nhân viên có dạng [{maNhanVien:1,....}, {maNhanVien:2,...}, {maNhanVien:3,....}]
 * @returns trả về kết quả là html <tr>...</tr> <tr>...</tr> <tr>...</tr>
 */
// In table ra danh sách nhân viên
function renderTableNhanVien(arrInput) {
  var html = "";
  for (var i = 0; i < arrInput.length; i++) {
    var nv = arrInput[i];
    // Bổ sung phương thức (lưu vào localStorage)
    nv.tongLuong = function () {
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
    nv.loaiNhanVien = function () {
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
    // in ra giao diện <tr><td></td></tr>
    html += `
    <tr>
        <td>${nv.taiKhoan}</td>
        <td>${nv.hoTen}</td>
        <td>${nv.email}</td>
        <td>${nv.ngayLam}</td>
        <td>${nv.chucVu}</td>
        <td>${nv.tongLuong()}</td>
        <td>${nv.loaiNhanVien()}</td>
        <td>
            <button   data-toggle="modal" data-target="#myModal" class="btn btn-warning " onclick="chinhSua('${
              nv.taiKhoan
            }')">
                <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button class="btn btn-danger" onclick="xoaNhanVien('${
              nv.taiKhoan
            }')">
                <i class="fa fa-trash" aria-hidden="true"></i>
            </button>
        </td>
    </tr>
    `;
  }
  document.querySelector("#tableDanhSach").innerHTML = html;
  return html;
}

// Lưu vào localStorage
function luuLocalStorage() {
  // Biến đổi mảng thành string
  var sMangNhanVien = JSON.stringify(arrNhanVien);
  //   Sau đó dùng string lưu vào localStorage
  localStorage.setItem("mangNhanVien", sMangNhanVien);
}

// Lấy dữ liệu từ localStorage
function layLocalStorage() {
  if (localStorage.getItem("mangNhanVien")) {
    // Lấy ra
    var sMangNhanVien = localStorage.getItem("mangNhanVien");
    // Lấy arrNhanVien gán = chuỗi được lấy từ localStorage ra
    arrNhanVien = JSON.parse(sMangNhanVien);

    // Tạo table từ mảng
    renderTableNhanVien(arrNhanVien);
  }
}

// Load browser hiển thị table
window.onload = function () {
  layLocalStorage();
};

// Hàm xóa nhân viên
function xoaNhanVien(maNhanVienClick) {
  //   var indexDel = arrNhanVien.findIndex((nv) => nv.taiKhoan === maNhanVienClick);

  //   if (indexDel !== -1) {
  //     arrNhanVien.splice(indexDel, 1);
  //   }
  //   renderTableNhanVien(arrNhanVien);

  var indexDel = -1;
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].taiKhoan === maNhanVienClick) {
      indexDel = i;
    }
  }
  arrNhanVien.splice(indexDel, 1);
  renderTableNhanVien(arrNhanVien);

  luuLocalStorage();
}

// Hàm lấy thông tin chỉnh sửa
function chinhSua(maNhanVienClick) {
  // block taiKhoan
  document.querySelector("#tknv").disabled = true;

  var indexEdit = -1;
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].taiKhoan === maNhanVienClick) {
      indexEdit = i;
      break;
    }
  }
  //   lấy thông tin lên giao diện
  var nvEdit = arrNhanVien[i];
  document.querySelector("#tknv").value = nvEdit.taiKhoan;
  document.querySelector("#name").value = nvEdit.hoTen;
  document.querySelector("#email").value = nvEdit.email;
  document.querySelector("#password").value = nvEdit.matKhau;

  //   xử lý ngày vào làm

  document.querySelector("#datepicker").value = nvEdit.ngayLam;
  //   nv.ngayLam = moment(xuLyNgay).format("DD/MM/YYYY");
  document.querySelector("#luongCB").value = nvEdit.luongCoBan;
  document.querySelector("#chucvu").value = nvEdit.chucVu;
  document.querySelector("#gioLam").value = nvEdit.gioLamTrongThang;
}

// Xử lý sự kiện Chỉnh sửa nhân viên
document.querySelector("#btnCapNhat").onclick = function () {
  var nv = new NhanVien();
  nv.taiKhoan = document.querySelector("#tknv").value;
  nv.hoTen = document.querySelector("#name").value;
  nv.email = document.querySelector("#email").value;
  nv.matKhau = document.querySelector("#password").value;

  //   xử lý ngày vào làm
  nv.ngayLam = document.querySelector("#datepicker").value;
  //   nv.ngayLam = moment(xuLyNgay).format("DD/MM/YYYY");
  nv.luongCoBan = document.querySelector("#luongCB").value;
  nv.chucVu = document.querySelector("#chucvu").value;
  nv.gioLamTrongThang = document.querySelector("#gioLam").value;

  // Kiểm tra trước khi thêm nhân viên

  var valid = true;

  //   KIỂM TRA RỖNG
  valid &=
    kiemTraRong(nv.taiKhoan, "#error_required_taiKhoan", "Tài khoản") &
    kiemTraRong(nv.hoTen, "#error_required_hoTen", "Tên nhân viên") &
    kiemTraRong(nv.email, "#error_required_email", "Email") &
    kiemTraRong(nv.matKhau, "#error_required_matKhau", "Mật khẩu") &
    kiemTraRong(nv.ngayLam, "#error_required_ngayLam", "Ngày làm") &
    kiemTraRong(nv.luongCoBan, "#error_required_luongCoBan", "Lương cơ bản") &
    kiemTraRong(
      nv.gioLamTrongThang,
      "#error_required_gioLamTrongThang",
      "Giờ làm trong tháng"
    ) &
    kiemTraChucVu(nv.chucVu, "#tbChucVu", "Chức vụ");

  // KIỂM TRA ĐỊNH DẠNG
  valid &=
    kiemTraDoDaKyTu(nv.taiKhoan, "#error_min_max_taiKhoan", "Tài khoản", 4, 6) &
    kiemTraTatCaChu(nv.hoTen, "#error_allLetter_hoTen", "Tên nhân viên") &
    kiemTraEmail(nv.email, "#error_email", "Email") &
    kiemTraMatKhau(nv.matKhau, "#error_matKhau", "Mật khẩu", 6, 10) &
    kiemTraNgay(nv.ngayLam, "#error_ngayLam", "Ngày làm") &
    kiemTraLuongCB(
      nv.luongCoBan,
      "#error_luongCoBan",
      "Lương cơ bản",
      1000000,
      20000000
    ) &
    kiemTraGioLamTrongThang(
      nv.gioLamTrongThang,
      "#tbGiolam",
      "Giờ vào làm",
      80,
      200
    );
  if (!valid) {
    return;
  }

  //    tìm nhân viên cần sửa
  //   var indexEdit = arrNhanVien.findIndex(
  //     (nhanVien) => (nhanVien.taiKhoan === nv.taiKhoan)
  //   );
  var indexEdit = -1;
  for (var i = 0; i < arrNhanVien.length; i++) {
    if (arrNhanVien[i].taiKhoan === nv.taiKhoan) {
      indexEdit = i;
      break;
    }
  }

  arrNhanVien[indexEdit].taiKhoan = nv.taiKhoan;
  arrNhanVien[indexEdit].hoTen = nv.hoTen;
  arrNhanVien[indexEdit].email = nv.email;
  arrNhanVien[indexEdit].matKhau = nv.matKhau;
  arrNhanVien[indexEdit].ngayLam = nv.ngayLam;
  arrNhanVien[indexEdit].luongCoBan = nv.luongCoBan;
  arrNhanVien[indexEdit].chucVu = nv.chucVu;
  arrNhanVien[indexEdit].gioLamTrongThang = nv.gioLamTrongThang;

  console.log("mang sau khi sua :" + arrNhanVien);
  renderTableNhanVien(arrNhanVien);

  luuLocalStorage();
};

// reset button thêm nhân viên
document.querySelector("#btnThem").onclick = function () {
  document.querySelector("#tknv").disabled = false;
  document.querySelector("#tknv").value = "";
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#password").value = "";

  //   xử lý ngày vào làm
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const formattedToday = mm + "/" + dd + "/" + yyyy;
  document.querySelector("#datepicker").value = formattedToday;
  //   nv.ngayLam = moment(xuLyNgay).format("DD/MM/YYYY");
  document.querySelector("#luongCB").value = 0;
  var slChucVu = document.querySelector("#chucvu");

  document.querySelector("#chucvu").value = slChucVu.value =
    slChucVu.getElementsByTagName("option")[0].innerHTML;
  document.querySelector("#gioLam").value = "";
};

// Tìm kiếm xếp loại nhân viên (xuất sắc, giỏi, khá, trung bình)
document.querySelector("#btnTimNV").onclick = function () {
  document.querySelector("#error_search").innerHTML = "";
  // input string
  var loaiNhanVien = document.querySelector("#searchName").value;
  //   output arrTimKiem = arr
  var arrTimKiem = [];
  //   progress
  var indexTimKiem = -1;
  if (loaiNhanVien === "xuất sắc") {
    for (var i = 0; i < arrNhanVien.length; i++) {
      if (arrNhanVien[i].gioLamTrongThang >= 192) {
        indexTimKiem = i;
        arrTimKiem.push(arrNhanVien[indexTimKiem]);
      }
    }
  } else if (loaiNhanVien === "giỏi") {
    for (var i = 0; i < arrNhanVien.length; i++) {
      if (
        arrNhanVien[i].gioLamTrongThang >= 176 &&
        arrNhanVien[i].gioLamTrongThang < 192
      ) {
        indexTimKiem = i;
        arrTimKiem.push(arrNhanVien[indexTimKiem]);
      }
    }
  } else if (loaiNhanVien === "khá") {
    for (var i = 0; i < arrNhanVien.length; i++) {
      if (
        arrNhanVien[i].gioLamTrongThang >= 160 &&
        arrNhanVien[i].gioLamTrongThang < 176
      ) {
        indexTimKiem = i;
        arrTimKiem.push(arrNhanVien[indexTimKiem]);
      }
    }
  } else if (loaiNhanVien === "trung bình") {
    for (var i = 0; i < arrNhanVien.length; i++) {
      if (arrNhanVien[i].gioLamTrongThang < 160) {
        indexTimKiem = i;
        arrTimKiem.push(arrNhanVien[indexTimKiem]);
      }
    }
  } else if (loaiNhanVien === "") {
    renderTableNhanVien(arrNhanVien);
    return;
  } else {
    document.querySelector("#error_search").innerHTML =
      "Không tìm thấy kết quả";
  }
  renderTableNhanVien(arrTimKiem);
};
