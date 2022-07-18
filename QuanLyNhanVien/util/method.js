// Hàm không để trống
function kiemTraRong(value, selectorError, name) {
  if (value.trim() !== "") {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không được để trống!";
  return false;
}

// Tối đa ký tự (Tài khoản)
function kiemTraDoDaKyTu(value, selectorError, name, minLength, maxLength) {
  var numberLength = value.length;
  if (numberLength < minLength || numberLength > maxLength) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minLength + " đến " + maxLength + " ký tự!";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

// Kiểm tra tên phải là chữ
function kiemTraTatCaChu(value, selectorError, name) {
  var regex = /^[A-Z a-z]+$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML = name + " phải nhập chữ!";
  return false;
}

// Kiểm tra định dạng email
function kiemTraEmail(value, selectorError, name) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = "";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không đúng định dạng!";
  return false;
}

// Kiểm tra định dạng mật khẩu {6,10} ký tự (1 ký tự số, 1 ký tự chữ in Hoa, 1 ký tự đặc biệt)
function kiemTraMatKhau(value, selectorError, name, minLength, maxLength) {
  var regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,10}$/;
  var lengthValue = value.length;
  if (lengthValue < minLength || lengthValue > maxLength) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minLength + " đến " + maxLength + " ký tự!";
    return false;
  } else {
    if (regex.test(value)) {
      document.querySelector(selectorError).innerHTML = " ";
      return true;
    } else {
      document.querySelector(selectorError).innerHTML =
        name + " không nhập đúng định dạng";
      return false;
    }
  }
}

// Kiểm tra định dạng ngày mm/dd/yyyy
function kiemTraNgay(value, selectorError, name) {
  var regex =
    /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/;
  if (regex.test(value)) {
    document.querySelector(selectorError).innerHTML = " ";
    return true;
  }
  document.querySelector(selectorError).innerHTML =
    name + " không nhập đúng định dạng";
  return false;
}

// Kiểm tra định dạng luongCb
function kiemTraLuongCB(value, selectorError, name, minLuong, maxLuong) {
  var numberValue = Number(value);
  var minVND = minLuong.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  var maxVND = maxLuong.toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
  if (numberValue < minLuong || numberValue > maxLuong) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minVND + " đến " + maxVND;
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

// Kiểm tra chức vụ
function kiemTraChucVu(value, selectorError, name) {
  if (value === "Chọn chức vụ") {
    document.querySelector(selectorError).innerHTML =
      "Phải chọn " + name + " hợp lệ";
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}

// Kiểm tra định dạng giờ vào làm
function kiemTraGioLamTrongThang(
  value,
  selectorError,
  name,
  minValue,
  maxValue
) {
  var numberValue = Number(value);
  if (numberValue < minValue || numberValue > maxValue) {
    document.querySelector(selectorError).innerHTML =
      name + " từ " + minValue + " đến " + maxValue;
    document.querySelector(selectorError).style.display = "block";
    return false;
  }
  document.querySelector(selectorError).innerHTML = "";
  return true;
}
