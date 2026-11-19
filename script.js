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

    const serviceCards = document.querySelectorAll(".service-card");

    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");


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


    /* =================================
       IN-PAGE MODALS (نوافذ العمليات)
    ================================= */

    window.openModal = function (id) {
        window.closeAllModals();
        hideSidebar();
        if (notifBox) {
            notifBox.classList.remove("show");
        }
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add("active");
        }
    };

    window.closeModal = function (id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove("active");
        }
    };

    window.closeAllModals = function () {
        document.querySelectorAll(".ejad-modal-overlay").forEach(function (m) {
            m.classList.remove("active");
        });
    };

    document.querySelectorAll(".ejad-modal-overlay").forEach(function (overlay) {
        overlay.addEventListener("click", function (e) {
            if (e.target === this) {
                this.classList.remove("active");
            }
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            window.closeAllModals();
        }
    });

    window.handleFormSubmit = function (event, successMessage) {
        event.preventDefault();
        const form = event.target;
        const inputs = form.querySelectorAll("input, select, textarea");
        const listContainer = document.getElementById("items-list-container");

        // إضافة الغرض تلقائياً إلى قائمة المفقودات إذا كان من نموذج تسجيل أو بلاغ
        if (listContainer && (form.closest("#modal-new-item") || form.closest("#modal-report"))) {
            const isNewItem = Boolean(form.closest("#modal-new-item"));
            const statusText = isNewItem
                ? (inputs[0].value === "found" ? "معثور عليه" : "مفقود")
                : "مفقود";
            const badgeColor = statusText === "معثور عليه" ? "#0284c7" : "#d97706";
            const itemName = isNewItem ? inputs[1].value : inputs[1].value;
            const itemLocation = isNewItem ? inputs[2].value : inputs[2].value;

            const card = document.createElement("div");
            card.className = "ejad-list-card";
            card.innerHTML = `
                <div>
                    <strong>${itemName}</strong>
                    <div style="font-size:0.85rem; opacity:0.8;">الموقع: ${itemLocation}</div>
                </div>
                <span class="ejad-badge" style="background:${badgeColor};">${statusText}</span>
            `;
            listContainer.prepend(card);
        }

        alert(successMessage);
        form.reset();
        window.closeAllModals();
    };

    window.generateItemQR = function (event) {
        event.preventDefault();
        const owner = document.getElementById("qr-owner").value;
        const id = document.getElementById("qr-id").value;
        const item = document.getElementById("qr-item").value;
        const phone = document.getElementById("qr-phone").value;

        const qrData = encodeURIComponent(`منصة إيجاد - الغرض: ${item} | المالك: ${owner} (${id}) | للتواصل: ${phone}`);
        const qrImg = document.getElementById("qr-image");
        if (qrImg) {
            qrImg.src = `https://qrserver.com{qrData}`;
        }

        const resultBox = document.getElementById("qr-result");
        if (resultBox) {
            resultBox.style.display = "block";
        }
    };

    window.filterModalList = function (query) {
        const cards = document.querySelectorAll("#items-list-container .ejad-list-card");
        const q = query.trim().toLowerCase();
        cards.forEach(function (card) {
            card.style.display = card.innerText.toLowerCase().includes(q) ? "flex" : "none";
        });
    };

});
