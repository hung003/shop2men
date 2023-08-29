// Hàm thêm món ăn
var menus = [];
document.getElementById("addMenu").addEventListener("click", function (e) {
  e.preventDefault(); // Ngăn chặn sự kiện mặc định của form

  // Lấy giá trị từ các trường nhập liệu
  var idmon = document.getElementById("idmon").value;
  var tenmon = document.getElementById("tenmon").value;
  var gia = document.getElementById("gia").value;
  var dvt = document.getElementById("dvt").value;
  var mota = document.getElementById("mota").value;

  // Kiểm tra nếu các trường nhập liệu không được để trống
  if (idmon && tenmon && gia && dvt && mota) {
    // Tạo đối tượng món ăn mới
    var menu = {
      idmon: idmon,
      tenmon: tenmon,
      gia: gia,
      dvt: dvt,
      mota: mota,
    };

    // Thêm món ăn vào mảng menus
    menus.push(menu);

    // Thêm món ăn vào bảng
    var table = document.getElementById("basic-datatable");
    var newRow = table.insertRow(-1);

    var sttCell = document.createElement("td");
    sttCell.innerText = table.getElementsByTagName("tr").length;

    var cell1 = newRow.insertCell();
    cell1.innerHTML = menu.idmon;

    var cell2 = newRow.insertCell();
    cell2.innerHTML = menu.tenmon;

    var cell3 = newRow.insertCell();
    cell3.innerHTML = menu.gia;

    var cell4 = newRow.insertCell();
    cell4.innerHTML = menu.dvt;

    var cell5 = newRow.insertCell();
    cell5.innerHTML = menu.mota;

    var actionCell = document.createElement("td");
    var editLink = document.createElement("a");

    editLink.href = "#";
    editLink.className = "btn btn-warning btn-sm fa-edit";
    editLink.innerText = "SỬA";
    actionCell.appendChild(editLink);

    var deleteLink = document.createElement("a");
    deleteLink.href = "#";
    deleteLink.className = "btn btn-danger btn-sm delete";
    deleteLink.innerText = "XÓA";
    actionCell.appendChild(deleteLink);

    newRow.appendChild(sttCell);
    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);
    newRow.appendChild(cell4);
    newRow.appendChild(cell5);
    newRow.appendChild(actionCell);

    // Hiển thị thông báo thành công
    alert("Thêm món ăn thành công!");

    // Đặt lại giá trị của các trường nhập liệu
    document.getElementById("idmon").value = "";
    document.getElementById("tenmon").value = "";
    document.getElementById("gia").value = "";
    document.getElementById("dvt").value = "";
    document.getElementById("mota").value = "";
  } else {
    // Hiển thị thông báo lỗi nếu các trường nhập liệu không hợp lệ
    alert("Vui lòng điền đầy đủ thông tin món ăn!");
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
    alert("Xóa món ăn thành công!");
  }
});
// Lấy form edit và các trường input
var editForm = document.querySelector("#editcontactmodal form");
var idmonInput = document.querySelector("#editcontactmodal #idmon");
var tenmonInput = document.querySelector("#editcontactmodal #tenmon");
var giaInput = document.querySelector("#editcontactmodal #gia");
var dvtInput = document.querySelector("#editcontactmodal #dvt");
var motaInput = document.querySelector("#editcontactmodal #mota");

// Lấy nút "Edit"
var editButtons = document.querySelectorAll(".fa-edit");

// Biến lưu trữ dòng đang được chỉnh sửa
var currentRow;

// Sự kiện click cho nút "Edit"
editButtons.forEach(function (editButton) {
  editButton.addEventListener("click", function () {
    // Lấy thông tin từ bảng
    var tableRow = this.closest("tr");
    var idmonValue = tableRow
      .querySelector("th:nth-child(2)")
      .textContent.trim();
    var tenmonValue = tableRow
      .querySelector("td:nth-child(3)")
      .textContent.trim();
    var giaValue = tableRow.querySelector("td:nth-child(4)").textContent.trim();
    var dvtValue = tableRow.querySelector("td:nth-child(5)").textContent.trim();
    var motaValue = tableRow
      .querySelector("td:nth-child(6)")
      .textContent.trim();

    // Gán giá trị cho các trường input trong form edit
    idmonInput.value = idmonValue;
    tenmonInput.value = tenmonValue;
    giaInput.value = giaValue;
    dvtInput.value = dvtValue;

    motaInput.value = motaValue;

    // Lưu trữ dòng đang được chỉnh sửa
    currentRow = tableRow;
  });
});

// Sự kiện submit form edit
editForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Lấy giá trị mới từ các trường input
  var newIdmonValue = idmonInput.value;
  var newTenmonValue = tenmonInput.value;
  var newgiaValue = giaInput.value;
  var newdvtValue = dvtInput.value;
  var newmotaValue = motaInput.value;

  // Cập nhật dữ liệu trong bảng
  currentRow.querySelector("th:nth-child(2)").textContent = newIdmonValue;
  currentRow.querySelector("td:nth-child(3)").textContent = newTenmonValue;
  currentRow.querySelector("td:nth-child(4)").textContent = newgiaValue;
  currentRow.querySelector("td:nth-child(5)").textContent = newdvtValue;
  currentRow.querySelector("td:nth-child(6)").textContent = newmotaValue;

  // Reset form
  editForm.reset();
});
