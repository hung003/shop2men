var selectedRow = null;

//show
function showAlert(message, className) {
  const div = document.createElement("div");
  div.className = `alert alert-${className}`;
  div.appendChild(document.createTextNode(message));
  const container = document.querySelector(".container");
  const main = document.querySelector(".main");
  container.insertBefore(div, main);

  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
// clear all field
function clearFields() {
  document.querySelector("#name").value = "";
  document.querySelector("#email").value = "";
  document.querySelector("#phonenumber").value = "";
}
//add
// document.querySelector("#customer-form").addEventListener("submit", (e) => {
//   e.preventDefault();
//   const name = document.querySelector("#name").value;
//   const email = document.querySelector("#email").value;
//   const phonenumber = document.querySelector("#phonenumber").value;

//   if (name == "" || email == "" || phonenumber == "") {
//     showAlert("please fill in al fields", "danger");
//   }
// });

//Delete
document.querySelector("#customer-list").addEventListener("click", (e) => {
  target = e.target;
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
    showAlert("customer deleted succed");
  }
});
// Mảng lưu trữ danh sách khách hàng
var customers = [];

// Hàm thêm khách hàng
document.querySelector("#addCustomer").addEventListener("click", (e) => {
  // Lấy giá trị từ các trường nhập liệu
  var idkh = document.getElementById("IDkh").value;
  var name = document.getElementById("name").value;
  var phoneNumber = document.getElementById("phonenumber").value;

  // Kiểm tra nếu các trường nhập liệu không được để trống
  if (idkh && name && phoneNumber) {
    // Tạo đối tượng khách hàng mới
    var customer = {
      idkh: idkh,
      name: name,
      phoneNumber: phoneNumber,
    };

    // Thêm khách hàng vào mảng customers
    customers.push(customer);

    // Thêm khách hàng vào bảng
    var table = document.getElementById("basic-datatable");
    var newRow = table.insertRow(-1);

    var sttCell = document.createElement("td");
    sttCell.innerText = table.getElementsByTagName("tr").length;

    var cell1 = newRow.insertCell();
    cell1.innerHTML = customer.idkh;

    var cell2 = newRow.insertCell();
    cell2.innerHTML = customer.name;

    var cell3 = newRow.insertCell();
    cell3.innerHTML = customer.phoneNumber;

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
    newRow.appendChild(actionCell);

    // Hiển thị thông báo thành công
    alert("Thêm khách hàng thành công!");

    // Đặt lại giá trị của các trường nhập liệu
    document.getElementById("IDkh").value = "";
    document.getElementById("name").value = "";
    document.getElementById("phonenumber").value = "";
  } else {
    // Hiển thị thông báo lỗi nếu các trường nhập liệu không hợp lệ
    alert("Vui lòng điền đầy đủ thông tin khách hàng!");
  }
});
// Lấy form edit và các trường input
var editForm = document.querySelector("#editcontactmodal form");
var IDkhInput = document.querySelector("#editcontactmodal #IDkh");
var nameInput = document.querySelector("#editcontactmodal #name");
var phonenumberInput = document.querySelector("#editcontactmodal #phonenumber");

// Lấy nút "Edit"
var editButtons = document.querySelectorAll(".fa-edit");

// Biến lưu trữ dòng đang được chỉnh sửa
var currentRow;

// Sự kiện click cho nút "Edit"
editButtons.forEach(function (editButton) {
  editButton.addEventListener("click", function () {
    // Lấy thông tin từ bảng
    var tableRow = this.closest("tr");
    var IDkhValue = tableRow
      .querySelector("th:nth-child(2)")
      .textContent.trim();
    var nameValue = tableRow
      .querySelector("td:nth-child(3)")
      .textContent.trim();
    var phonenumberValue = tableRow
      .querySelector("td:nth-child(4)")
      .textContent.trim();

    // Gán giá trị cho các trường input trong form edit
    IDkhInput.value = IDkhValue;
    nameInput.value = nameValue;
    phonenumberInput.value = phonenumberValue;

    // Lưu trữ dòng đang được chỉnh sửa
    currentRow = tableRow;
  });
});

// Sự kiện submit form edit
editForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Lấy giá trị mới từ các trường input
  var newIdkhValue = IDkhInput.value;
  var newNameValue = nameInput.value;
  var newPhoneValue = phonenumberInput.value;

  // Cập nhật dữ liệu trong bảng
  currentRow.querySelector("th:nth-child(2)").textContent = newIdkhValue;
  currentRow.querySelector("td:nth-child(3)").textContent = newNameValue;
  currentRow.querySelector("td:nth-child(4)").textContent = newPhoneValue;

  // Reset form
  editForm.reset();
});
