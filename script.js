document.addEventListener("DOMContentLoaded", function () {

    /* =================================
       ELEMENTS
    ================================= */

    const menuBtn = document.getElementById("btn-menu");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("closeSidebar");

    const bellBtn = document.getElementById("btn-bell");
    const notifBox = document.getElementById("notif-box");
    const closeNotif = document.getElementById("close-notif");

    const searchInput = document.getElementById("site-search");
    const searchButton = document.getElementById("search-button");

    const serviceCards = document.querySelectorAll("#view-home .service-card");

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");

    const homeView = document.getElementById("view-home");
    const subViews = document.querySelectorAll(".app-page-view");
    const pageTriggers = document.querySelectorAll("[data-page]");


    /* =================================
       INTERNAL SPA NAVIGATION
    ================================= */

    function navigateToPage(pageName) {
        if (!pageName || pageName === "home") {
            subViews.forEach(function (view) {
                view.classList.remove("active-view");
            });
            if (homeView) {
                homeView.style.display = "block";
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const targetView = document.getElementById("view-" + pageName);
        if (targetView) {
            if (homeView) {
                homeView.style.display = "none";
            }
            subViews.forEach(function (view) {
                view.classList.remove("active-view");
            });
            targetView.classList.add("active-view");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    pageTriggers.forEach(function (trigger) {
        trigger.addEventListener("click", function (e) {
            e.preventDefault();
            const targetPage = trigger.getAttribute("data-page");
            hideSidebar();
            if (notifBox) {
                notifBox.classList.remove("show");
            }
            navigateToPage(targetPage);
        });
    });

    /* INTERNAL FORMS HANDLING */
    const internalForms = document.querySelectorAll(".app-internal-form");
    internalForms.forEach(function (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            if (form.id === "qr-generator-form") {
                const name = document.getElementById("qr-name").value.trim();
                const id = document.getElementById("qr-id").value.trim();
                const phone = document.getElementById("qr-phone").value.trim();
                const qrData = encodeURIComponent("منصة إيجاد | الاسم: " + name + " | الرقم: " + id + " | الجوال: " + phone);
                const output = document.getElementById("qr-output");
                output.innerHTML = '<img src="https://qrserver.com' + qrData + '" alt="QR Code" style="border-radius:10px; padding:8px; background:#fff;"><p style="margin-top:8px; font-size:0.9rem;">تم إنشاء الرمز بنجاح، يمكنك حفظ الصورة وطباعتها.</p>';
                return;
            }
            alert("تم استلام طلبك وتسجيله في النظام بنجاح.");
            form.reset();
            navigateToPage("home");
        });
    });


    /* =================================
       SIDEBAR
    ================================= */

    function openSidebar() {
        if (!sidebar) return;

        sidebar.classList.add("open");

        if (notifBox) {
            notifBox.classList.remove("show");
        }
    }

    function hideSidebar() {
        if (sidebar) {
            sidebar.classList.remove("open");
        }
    }

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function (e) {
            e.stopPropagation();

            if (sidebar.classList.contains("open")) {
                hideSidebar();
            } else {
                openSidebar();
            }
        });

        if (closeSidebar) {
            closeSidebar.addEventListener("click", hideSidebar);
        }

        sidebar.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        document.addEventListener("click", function (e) {
            if (
                !sidebar.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                hideSidebar();
            }
        });
    }


    /* =================================
       NOTIFICATIONS
    ================================= */

    if (bellBtn && notifBox) {

        bellBtn.addEventListener("click", function (e) {

            e.stopPropagation();

            const isOpen = notifBox.classList.contains("show");

            notifBox.classList.toggle("show", !isOpen);

            hideSidebar();
        });

        notifBox.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        if (closeNotif) {
            closeNotif.addEventListener("click", function () {
                notifBox.classList.remove("show");
            });
        }

        document.addEventListener("click", function (e) {
            if (
                !notifBox.contains(e.target) &&
                !bellBtn.contains(e.target)
            ) {
                notifBox.classList.remove("show");
            }
        });
    }


    /* =================================
       SEARCH
    ================================= */

    function performSearch() {

        if (!searchInput) return;

        if (homeView && homeView.style.display === "none") {
            navigateToPage("home");
        }

        const searchValue = searchInput.value.trim().toLowerCase();

        if (serviceCards.length === 0) {
            if (searchValue !== "") {
                alert("البحث في هذه الصفحة غير متاح حالياً.");
            }
            return;
        }

        let found = 0;

        serviceCards.forEach(function (card) {

            const content = card.textContent.toLowerCase();

            const matches = content.includes(searchValue);

            card.classList.toggle(
                "search-hidden",
                searchValue !== "" && !matches
            );

            if (matches) found++;
        });

        if (searchValue !== "" && found === 0) {
            alert("لم يتم العثور على نتائج مطابقة.");
        }
    }

    if (searchButton && searchInput) {

        searchButton.addEventListener("click", performSearch);

        searchInput.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                performSearch();
            }
        });

        searchInput.addEventListener("input", function () {

            if (searchInput.value.trim() === "") {

                serviceCards.forEach(function (card) {
                    card.classList.remove("search-hidden");
                });

            } else {
                performSearch();
            }
        });
    }


    /* =================================
       LIGHT / DARK MODE
    ================================= */

    function applyTheme(theme) {

        const isDark = theme === "dark";

        document.body.classList.toggle("dark-mode", isDark);

        if (themeIcon) {
            themeIcon.setAttribute(
                "href",
                isDark ? "#i-sun" : "#i-moon"
            );
        }

        if (themeToggle) {

            const label = isDark
                ? "تفعيل الوضع النهاري"
                : "تفعيل الوضع الليلي";

            themeToggle.setAttribute("aria-label", label);
            themeToggle.setAttribute("title", label);
        }
    }


    /* LOAD SAVED THEME */

    let savedTheme = "light";

    try {
        savedTheme = localStorage.getItem("ejad-theme") || "light";
    } catch (error) {
        savedTheme = "light";
    }

    applyTheme(savedTheme);


    /* CHANGE THEME */

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const newTheme =
                document.body.classList.contains("dark-mode")
                    ? "light"
                    : "dark";

            try {
                localStorage.setItem("ejad-theme", newTheme);
            } catch (error) {
                console.warn("تعذر حفظ إعداد الإضاءة.");
            }

            applyTheme(newTheme);
        });
    }

});
