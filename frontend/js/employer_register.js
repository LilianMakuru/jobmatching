document.getElementById("employerRegisterForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const companyName = document.getElementById("companyName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    const response = await fetch("/api/employers/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ companyName, email, password })
    });
  
    const result = await response.json();
    if (result.success) {
      alert("Registration successful!");
      window.location.href = "employer_dashboard.html";
    } else {
      alert(result.message || "Registration failed");
    }
  });
  