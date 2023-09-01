// Hàm thêm món ăn
var tables = [];
document.getElementById("addTable").addEventListener("click", function (e) {
  e.preventDefault(); // Ngăn chặn sự kiện mặc định của form

  // Lấy giá trị từ các trường nhập liệu
  var Idhang = document.getElementById("Idhang").value;
  var tenhang = document.getElementById("tenhang").value;
  var soluong = document.getElementById("soluong").value;
  var dvt = document.getElementById("dvt").value;

  // Kiểm tra nếu các trường nhập liệu không được để trống
  if (Idhang && tenhang && soluong && dvt) {
    // Tạo đối tượng món ăn mới
    var table = {
      Idhang: Idhang,
      tenhang: tenhang,
      soluong: soluong,
      dvt: dvt,
    };

    // Thêm món ăn vào mảng tables
    tables.push(table);

    // Thêm món ăn vào bảng
    var tableElement = document.getElementById("basic-datatable");
    var newRow = tableElement.insertRow(-1);

    var sttCell = document.createElement("td");
    sttCell.innerText = tableElement.getElementsByTagName("tr").length;

    var cell1 = newRow.insertCell();
    cell1.innerHTML = table.Idhang;

    var cell2 = newRow.insertCell();
    cell2.innerHTML = table.tenhang;

    var cell3 = newRow.insertCell();
    cell3.innerHTML = table.soluong;
    var cell4 = newRow.insertCell();
    cell4.innerHTML = table.soluong;

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
    newRow.appendChild(cell4);
    newRow.appendChild(actionCell);

    // Hiển thị thông báo thành công
    alert("Thêm kho thành công!");

    // Đặt lại giá trị của các trường nhập liệu
    document.getElementById("Idhang").value = "";
    document.getElementById("tenhang").value = "";
    document.getElementById("soluong").value = "";
    document.getElementById("dvt").value = "";
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
    alert("Xóa mặt hàng thành công!");
  }
});
// Lấy form edit và các trường input
var editForm = document.querySelector("#editcontactmodal form");
var IdhangInput = document.querySelector("#editcontactmodal #Idhang");
var tenhangInput = document.querySelector("#editcontactmodal #tenhang");
var soluongInput = document.querySelector("#editcontactmodal #soluong");
var dvtInput = document.querySelector("#editcontactmodal #dvt");

// Lấy nút "Edit"
var editButtons = document.querySelectorAll(".fa-edit");

// Biến lưu trữ dòng đang được chỉnh sửa
var currentRow;

// Sự kiện click cho nút "Edit"
editButtons.forEach(function (editButton) {
  editButton.addEventListener("click", function () {
    // Lấy thông tin từ bảng
    var tableRow = this.closest("tr");
    var IdhangValue = tableRow
      .querySelector("th:nth-child(2)")
      .textContent.trim();
    var tenhangValue = tableRow
      .querySelector("td:nth-child(3)")
      .textContent.trim();
    var soluongValue = tableRow
      .querySelector("td:nth-child(4)")
      .textContent.trim();
    var dvtValue = tableRow.querySelector("td:nth-child(5)").textContent.trim();

    // Gán giá trị cho các trường input trong form edit
    IdhangInput.value = IdhangValue;
    tenhangInput.value = tenhangValue;
    soluongInput.value = soluongValue;
    dvtInput.value = dvtValue;

    // Lưu trữ dòng đang được chỉnh sửa
    currentRow = tableRow;
  });
});

// Sự kiện submit form edit
editForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Lấy giá trị mới từ các trường input
  var newIdhangValue = IdhangInput.value;
  var newTenHangValue = tenhangInput.value;
  var newSoluongValue = soluongInput.value;
  var newdvtValue = dvtInput.value;

  // Cập nhật dữ liệu trong bảng
  currentRow.querySelector("th:nth-child(2)").textContent = newIdhangValue;
  currentRow.querySelector("td:nth-child(3)").textContent = newTenHangValue;
  currentRow.querySelector("td:nth-child(4)").textContent = newSoluongValue;
  currentRow.querySelector("td:nth-child(5)").textContent = newdvtValue;

  // Reset form
  editForm.reset();
});
