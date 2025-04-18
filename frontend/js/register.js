document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Zuia form isitume data kwa njia ya kawaida

        // Pata data kutoka kwa inputs
        const fullname = document.getElementById("fullname").value;
        const national_id = document.getElementById("national_id").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!fullname || !national_id || !email || !password) {
            alert("⚠️ All fields are required!");
            return;
        }

        try {
            console.log("📩 Sending registration request...");
            const response = await fetch("http://localhost:5000/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullname, national_id, email, password }),
            });

            const data = await response.json();
            console.log("📨 Server Response:", data);

            if (response.ok) {
                alert("✅ Registration successful! Redirecting to login page.");
                window.location.href = "login.html"; // Elekeza user kwenye login
            } else {
                alert("❌ Error: " + data.message); // Onyesha ujumbe wa kosa
            }
        } catch (error) {
            console.error("❌ Error:", error);
            alert("⚠️ An error occurred while registering.");
        }
    });

    document.querySelector('.hamburger').addEventListener('click', function() {
        document.body.classList.toggle('nav-open');
    });
}
);
