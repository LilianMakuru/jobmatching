document.getElementById("jobForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const title = document.getElementById("jobTitle").value;
    const description = document.getElementById("jobDescription").value;
  
    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description })
    });
  
    const result = await response.json();
    if (result.success) {
      alert("Job posted!");
      loadJobs(); // Refresh jobs
    } else {
      alert("Failed to post job");
    }
  });
  
  async function loadJobs() {
    const res = await fetch("/api/jobs");
    const jobs = await res.json();
    const list = document.getElementById("jobList");
    list.innerHTML = "";
    jobs.forEach(job => {
      const li = document.createElement("li");
      li.innerText = `${job.title} - ${job.description}`;
      list.appendChild(li);
    });
  }
  
  window.addEventListener("DOMContentLoaded", loadJobs);
  