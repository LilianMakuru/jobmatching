document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent page reload

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        alert(data.message);
        window.location.href = "dashboard.html"; // Redirect after login success
    } else {
        alert(data.error);
    }
});
