function openAppPage(pageName) {
    var homeView = document.getElementById("view-home");
    var subViews = document.querySelectorAll(".app-page-view");
    var sidebar = document.getElementById("sidebar");
    var notifBox = document.getElementById("notif-box");

    if (sidebar) sidebar.classList.remove("open");
    if (notifBox) notifBox.classList.remove("show");

    for (var i = 0; i < subViews.length; i++) {
        subViews[i].style.display = "none";
    }

    if (!pageName || pageName === "home") {
        if (homeView) homeView.style.display = "block";
    } else {
        var target = document.getElementById("view-" + pageName);
        if (target) {
            if (homeView) homeView.style.display = "none";
            target.style.display = "block";
        }
    }
    window.scrollTo(0, 0);
}

function submitInternalForm(e, msg) {
    e.preventDefault();
    alert(msg);
    e.target.reset();
    openAppPage("home");
}

function generateInternalQR(e) {
    e.preventDefault();
    var name = document.getElementById("qr-name").value;
    var id = document.getElementById("qr-id").value;
    var phone = document.getElementById("qr-phone").value;
    var data = encodeURIComponent("منصة إيجاد | الاسم: " + name + " | الرقم: " + id + " | الجوال: " + phone);
    document.getElementById("qr-output").innerHTML = '<img src="https://qrserver.com' + data + '" style="border-radius:10px;padding:8px;background:#fff;">';
}

document.addEventListener("DOMContentLoaded", function () {
    var menuBtn = document.getElementById("btn-menu");
    var sidebar = document.getElementById("sidebar");
    var closeSidebar = document.getElementById("closeSidebar");
    var bellBtn = document.getElementById("btn-bell");
    var notifBox = document.getElementById("notif-box");
    var closeNotif = document.getElementById("close-notif");
    var themeToggle = document.getElementById("theme-toggle");
    var themeIcon = document.getElementById("theme-icon");

    if (menuBtn && sidebar) {
        menuBtn.onclick = function (e) { e.stopPropagation(); sidebar.classList.toggle("open"); if (notifBox) notifBox.classList.remove("show"); };
        if (closeSidebar) closeSidebar.onclick = function () { sidebar.classList.remove("open"); };
    }

    if (bellBtn && notifBox) {
        bellBtn.onclick = function (e) { e.stopPropagation(); notifBox.classList.toggle("show"); if (sidebar) sidebar.classList.remove("open"); };
        if (closeNotif) closeNotif.onclick = function () { notifBox.classList.remove("show"); };
    }

    if (themeToggle) {
        themeToggle.onclick = function () {
            var isDark = document.body.classList.toggle("dark-mode");
            if (themeIcon) themeIcon.setAttribute("href", isDark ? "#i-sun" : "#i-moon");
        };
    }
});
