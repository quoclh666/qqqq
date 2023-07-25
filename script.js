function checkPassword() {
  var password = document.getElementById("passwordInput").value;

  // Kiểm tra xem người dùng đã nhập sai mật khẩu bao nhiêu lần trong ngày hôm nay
  var attemptsToday = getLoginAttemptsToday();
  var maxAttemptsPerDay = 100;
  var attemptsLeft = maxAttemptsPerDay - attemptsToday;

  if (attemptsLeft <= 0) {
    alert("Bạn đã nhập sai mật khẩu quá nhiều lần hôm nay. Thử lại sau!");
    return;
  }

  // Hiển thị số lần nhập còn lại cho người dùng
  var attemptsLeftMessage = "Số lần nhập còn lại trong ngày hôm nay: " + attemptsLeft;
  document.getElementById("attemptsLeft").innerText = attemptsLeftMessage;

  // Kiểm tra xem mật khẩu có chính xác không
  if (password === "tpt") {
    // Nếu đúng, chuyển hướng đến trang thứ hai
    window.location.href = "page2.html";
  } else if (password === "280801") {
    showPopup("không phải ngày sinh của anh rồi!");
  } else if (password === "160202") {
    showPopup("Không dễ như thế đâu ^^!");
  } else if (password === "tpthao") {
    showPopup("Gần đúng rồi đó!");
  } else if (password === "141211") {
    showPopup("Không phải 141211 rồi!");
  } else if (password === "141211IU") {
    showPopup("Happy Birthday!");
  } else {
    // Nếu sai, tăng số lần nhập sai và lưu vào Local Storage
    incrementLoginAttempts();
    alert("Mật khẩu không đúng. Hãy thử lại!");
  }
}

function showPopup(message) {
  alert(message);
  document.getElementById("passwordInput").value = ""; // Xóa nội dung mật khẩu đã nhập
}

  
  function getLoginAttemptsToday() {
    // Kiểm tra xem có thông tin về số lần nhập sai trong Local Storage không
    if (localStorage.loginAttempts && localStorage.lastAttemptDate) {
      var lastAttemptDate = new Date(localStorage.lastAttemptDate);
      var today = new Date();
  
      // Nếu ngày cuối cùng nhập sai là ngày hôm nay, trả về số lần nhập sai
      if (
        lastAttemptDate.getDate() === today.getDate() &&
        lastAttemptDate.getMonth() === today.getMonth() &&
        lastAttemptDate.getFullYear() === today.getFullYear()
      ) {
        return parseInt(localStorage.loginAttempts);
      }
    }
  
    // Nếu không có thông tin hoặc đã qua ngày mới, trả về 0 lần nhập sai
    return 0;
  }
  
  function incrementLoginAttempts() {
    var attemptsToday = getLoginAttemptsToday();
    // Tăng số lần nhập sai lên 1 và lưu vào Local Storage
    localStorage.loginAttempts = attemptsToday + 1;
    localStorage.lastAttemptDate = new Date();
  }
  function getTimeToBirthday() {
    var now = new Date();
    var birthday = new Date(now.getFullYear(), 1, 16); // Giả sử ngày sinh nhật là ngày 1 tháng 9 (tháng 9 là tháng 8 vì tháng bắt đầu từ 0)
  
    if (now > birthday) {
      // Nếu đã qua ngày sinh nhật trong năm này, chuyển sang năm sau
      birthday.setFullYear(birthday.getFullYear() + 1);
    }
  
    var timeDiff = birthday.getTime() - now.getTime();
    var daysLeft = Math.floor(timeDiff / (1000 * 3600 * 24)); // Chuyển đổi sang số ngày còn lại
  
    return daysLeft;
  }
  
  // Hàm cập nhật thông tin thời gian còn lại cho đến ngày sinh nhật và hiển thị
  function updateCountdown() {
    var daysLeft = getTimeToBirthday();
    var countdownMessage = "Còn " + daysLeft + " ngày";
  
    var now = new Date();
    var hoursLeft = 23 - now.getHours();
    var minutesLeft = 59 - now.getMinutes();
    var secondsLeft = 59 - now.getSeconds();
    var timeLeftMessage = hoursLeft + " giờ " + minutesLeft + " phút " + secondsLeft + " giây nữa đến sinh nhật.";
    
    document.getElementById("timeToBirthday").innerText = countdownMessage + " " + timeLeftMessage;
  }
  
  // Gọi hàm cập nhật countdown khi tải trang
  updateCountdown();
  
  // Cập nhật thông tin thời gian còn lại mỗi giây
  setInterval(updateCountdown, 1000);

  // Hàm hiển thị địa chỉ IP và thông tin thời tiết
  function showIPAddress() {
    fetch("https://api.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        var ipAddress = data.ip;
        document.getElementById("ipAddress").innerText = "Địa chỉ IP của bạn: " + ipAddress;
      })
      .catch((error) => {
        console.error("Không thể lấy địa chỉ IP: ", error);
      });
  }
  
  // Hàm hiển thị giờ hiện tại
  function showCurrentTime() {
    var now = new Date();
    var currentTime = now.toLocaleTimeString();
    document.getElementById("currentTime").innerText = "Giờ hiện tại: " + currentTime;
  }
  // Hàm lấy thông tin liên hệ từ nguồn dữ liệu (ví dụ: API) và cập nhật phần tử HTML tương ứng
function updateContactInfo() {
    // Sử dụng các phương thức (fetch, AJAX, ...) để lấy thông tin liên hệ từ API hoặc nguồn dữ liệu khác
    var facebookPageLink = "https://www.facebook.com/yourfacebookpage";
    var emailAddress = "your.email@example.com";
  
    // Cập nhật phần tử HTML tương ứng với thông tin mới
    document.getElementById("facebookLink").href = facebookPageLink;
    document.getElementById("emailAddress").innerText = "Email: " + emailAddress;
  }
  // Gọi hàm cập nhật countdown khi tải trang
  updateCountdown();
  
  // Gọi hàm hiển thị địa chỉ IP và giờ hiện tại khi tải trang
  showIPAddress();
  showCurrentTime();
  
  // Cập nhật thông tin thời gian còn lại và giờ hiện tại mỗi giây
  setInterval(function () {
    updateCountdown();
    showCurrentTime();
  }, 1000);
  // Gọi hàm cập nhật thông tin liên hệ khi tải trang
updateContactInfo();

