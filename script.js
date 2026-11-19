
document.addEventListener("DOMContentLoaded", function () {

    /* SIDEBAR */
    const menuBtn = document.getElementById("btn-menu");
    const sidebar = document.getElementById("sidebar");
    const closeSidebar = document.getElementById("closeSidebar");

    function hideSidebar() {
        if (sidebar) {
            sidebar.classList.remove("open");
        }
    }

    if (menuBtn && sidebar) {

        menuBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            sidebar.classList.toggle("open");

            if (notifBox) {
                notifBox.style.display = "none";
            }
        });

        if (closeSidebar) {
            closeSidebar.addEventListener("click", hideSidebar);
        }

        document.addEventListener("click", function (e) {
            if (
                !sidebar.contains(e.target) &&
                !menuBtn.contains(e.target)
            ) {
                hideSidebar();
            }
        });
    }

    /* NOTIFICATIONS */
    const bellBtn = document.getElementById("btn-bell");
    const notifBox = document.getElementById("notif-box");
    const closeNotif = document.getElementById("close-notif");

    if (bellBtn && notifBox) {

        bellBtn.addEventListener("click", function (e) {
            e.stopPropagation();

            notifBox.style.display =
                notifBox.style.display === "block" ? "none" : "block";

            if (sidebar) {
                sidebar.classList.remove("open");
            }
        });

        if (closeNotif) {
            closeNotif.addEventListener("click", function () {
                notifBox.style.display = "none";
            });
        }

        notifBox.addEventListener("click", function (e) {
            e.stopPropagation();
        });

        document.addEventListener("click", function (e) {
            if (!notifBox.contains(e.target) &&
                !bellBtn.contains(e.target)) {
                notifBox.style.display = "none";
            }
        });
    }

    /* SEARCH */
    const searchInput = document.getElementById("site-search");
    const searchIcon = document.querySelector(".nav-search-icon");
    const serviceCards = document.querySelectorAll(".service-card");

    function performSearch() {

        if (!searchInput) return;

        const searchValue = searchInput.value.trim().toLowerCase();

        if (searchValue === "") {
            serviceCards.forEach(function (card) {
                card.classList.remove("search-hidden");
            });
            return;
        }

        let found = 0;

        serviceCards.forEach(function (card) {

            const content = card.textContent.toLowerCase();

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

});
