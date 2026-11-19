
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
    const searchIcon = document.querySelector(".nav-search-icon");

    const serviceCards = document.querySelectorAll(".service-card");

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");


    /* =================================
       SIDEBAR
    ================================= */

    function openSidebar() {
        if (sidebar) {
            sidebar.classList.add("open");
        }

        if (notifBox) {
            notifBox.style.display = "none";
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

            const isOpen =
                notifBox.style.display === "block";

            notifBox.style.display =
                isOpen ? "none" : "block";

            hideSidebar();

        });

        notifBox.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        if (closeNotif) {

            closeNotif.addEventListener("click", function () {
                notifBox.style.display = "none";
            });

        }

        document.addEventListener("click", function (e) {

            if (
                !notifBox.contains(e.target) &&
                !bellBtn.contains(e.target)
            ) {
                notifBox.style.display = "none";
            }

        });
    }


    /* =================================
       SEARCH
    ================================= */

    function performSearch() {

        if (!searchInput) return;

        const searchValue =
            searchInput.value.trim().toLowerCase();

        if (searchValue === "") {

            serviceCards.forEach(function (card) {
                card.classList.remove("search-hidden");
            });

            return;
        }

        let found = 0;

        serviceCards.forEach(function (card) {

            const content =
                card.textContent.toLowerCase();

            if (content.includes(searchValue)) {

                card.classList.remove("search-hidden");
                found++;

            } else {

                card.classList.add("search-hidden");

            }

        });

        if (found === 0) {
            alert("لم يتم العثور على نتائج مطابقة.");
        }

    }


    if (searchIcon && searchInput) {

        searchIcon.addEventListener("click", performSearch);

        searchIcon.addEventListener("keydown", function (e) {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();
                performSearch();

            }

        });

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

            }

        });

    }


    /* =================================
       LIGHT / DARK MODE
    ================================= */

    function applyTheme(theme) {

        document.body.classList.toggle(
            "dark-mode",
            theme === "dark"
        );

        if (themeIcon) {

            themeIcon.setAttribute(
                "href",
                theme === "dark" ? "#i-sun" : "#i-moon"
            );

        }

        if (themeToggle) {

            themeToggle.setAttribute(
                "aria-label",
                theme === "dark"
                    ? "تفعيل الوضع النهاري"
                    : "تفعيل الوضع الليلي"
            );

            themeToggle.setAttribute(
                "title",
                theme === "dark"
                    ? "تفعيل الوضع النهاري"
                    : "تفعيل الوضع الليلي"
            );

        }

    }


    /* LOAD SAVED THEME */

    let savedTheme = "light";

    try {

        savedTheme =
            localStorage.getItem("ejad-theme") || "light";

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
