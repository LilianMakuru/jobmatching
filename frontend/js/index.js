document.addEventListener("DOMContentLoaded", function () {
    console.log("🚀 JavaScript Loaded!");

    // Function ya kuweka event kwa button yoyote ya link
    function setLinkHandler(selector, targetPage, logMsg) {
        const btn = document.querySelector(selector);
        if (btn) {
            btn.addEventListener("click", function (event) {
                event.preventDefault();
                console.log(logMsg);
                window.location.href = targetPage;
            });
        }
    }

    // 🧭 Setup links
    setLinkHandler("nav a[href='./register.html']", "register.html", "🔗 Redirecting to Register Page...");
    setLinkHandler("nav a[href='./login.html']", "login.html", "🔗 Redirecting to Login Page...");
    setLinkHandler("nav a[href='./employer_register.html']", "employer_register.html", "🔗 Redirecting to Employer Register...");
    setLinkHandler("nav a[href='./employer_dashboard.html']", "employer_dashboard.html", "🔗 Redirecting to Employer Dashboard...");
});
