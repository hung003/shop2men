// Hàm thêm món ăn
var tables = [];
document.getElementById("addTable").addEventListener("click", function (e) {
  e.preventDefault(); // Ngăn chặn sự kiện mặc định của form

  // Lấy giá trị từ các trường nhập liệu
  var idBan = document.getElementById("idBan").value;
  var tenBan = document.getElementById("tenBan").value;
  var trangThai = document.getElementById("trangThai").value;

  // Kiểm tra nếu các trường nhập liệu không được để trống
  if (idBan && tenBan && trangThai) {
    // Tạo đối tượng món ăn mới
    var table = {
      idBan: idBan,
      tenBan: tenBan,
      trangThai: trangThai,
    };

    // Thêm món ăn vào mảng tables
    tables.push(table);

    // Thêm món ăn vào bảng
    var tableElement = document.getElementById("basic-datatable");
    var newRow = tableElement.insertRow(-1);

    var sttCell = document.createElement("td");
    sttCell.innerText = tableElement.getElementsByTagName("tr").length;

    var cell1 = newRow.insertCell();
    cell1.innerHTML = table.idBan;

    var cell2 = newRow.insertCell();
    cell2.innerHTML = table.tenBan;

    var cell3 = newRow.insertCell();
    cell3.innerHTML = table.trangThai;

    var actionCell = document.createElement("td");
    var editLink = document.createElement("a");

    editLink.href = "#";
    editLink.className = "btn btn-warning btn-sm fa-edit";
    editLink.innerText = "SỬA";
    editLink.onclick = function () {
      return false;
    };
    actionCell.appendChild(editLink);

    var deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.className = "btn btn-danger btn-sm delete";
    deleteLink.innerText = "XÓA";
    deleteLink.onclick = function () {
      return false;
    };
    actionCell.appendChild(deleteLink);

    newRow.appendChild(sttCell);
    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
    newRow.appendChild(actionCell);

    // Hiển thị thông báo thành công
    alert("Thêm bàn thành công!");

    // Đặt lại giá trị của các trường nhập liệu
    document.getElementById("idBan").value = "";
    document.getElementById("tenBan").value = "";
    document.getElementById("trangThai").value = "";
  } else {
    // Hiển thị thông báo lỗi nếu các trường nhập liệu không hợp lệ
    alert("Vui lòng điền đầy đủ thông tin bàn!");
  }
});
// Lắng nghe sự kiện click trên nút "XÓA"
document.addEventListener("click", function (e) {
  // Kiểm tra xem người dùng đã nhấp vào nút "XÓA" hay không
  if (e.target.classList.contains("delete")) {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của nút "XÓA"

    // Xác định hàng chứa nút "XÓA" mà người dùng đã nhấp vào
    var row = e.target.closest("tr");

    // Xóa hàng khỏi bảng
    row.parentNode.removeChild(row);

    // Hiển thị thông báo thành công
    alert("Xóa bàn thành công!");
  }
});
// Lấy form edit và các trường input
var editForm = document.querySelector("#editcontactmodal form");
var idBanInput = document.querySelector("#editcontactmodal #idBan");
var tenBanInput = document.querySelector("#editcontactmodal #tenBan");
var trangThaiInput = document.querySelector("#editcontactmodal #trangThai");

// Lấy nút "Edit"
var editButtons = document.querySelectorAll(".fa-edit");

// Biến lưu trữ dòng đang được chỉnh sửa
var currentRow;

// Sự kiện click cho nút "Edit"
editButtons.forEach(function (editButton) {
  editButton.addEventListener("click", function () {
    // Lấy thông tin từ bảng
    var tableRow = this.closest("tr");
    var idBanValue = tableRow
      .querySelector("th:nth-child(2)")
      .textContent.trim();
    var tenBanValue = tableRow
      .querySelector("td:nth-child(3)")
      .textContent.trim();
    var trangThaiValue = tableRow
      .querySelector("td:nth-child(4)")
      .textContent.trim();

    // Gán giá trị cho các trường input trong form edit
    idBanInput.value = idBanValue;
    tenBanInput.value = tenBanValue;
    trangThaiInput.value = trangThaiValue;

    // Lưu trữ dòng đang được chỉnh sửa
    currentRow = tableRow;
  });
});

// Sự kiện submit form edit
editForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Lấy giá trị mới từ các trường input
  var newIdBanValue = idBanInput.value;
  var newTenBanValue = tenBanInput.value;
  var newTrangThaiValue = trangThaiInput.value;

  // Cập nhật dữ liệu trong bảng
  currentRow.querySelector("th:nth-child(2)").textContent = newIdBanValue;
  currentRow.querySelector("td:nth-child(3)").textContent = newTenBanValue;
  currentRow.querySelector("td:nth-child(4)").textContent = newTrangThaiValue;

  // Reset form
  editForm.reset();
});
