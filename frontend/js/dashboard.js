// 📁 dashboard.js

document.addEventListener("DOMContentLoaded", function () {
    const profileForm = document.getElementById("profileForm");
    const jobSection = document.getElementById("job-section");
    const jobList = document.getElementById("jobList");
    const profileSection = document.getElementById("profile-section");
    const previewSection = document.getElementById("preview-section");

    // Load saved profile from localStorage
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
        displayProfile(savedProfile);
    }

    profileForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const fullName = document.getElementById("fullName").value;
        const profession = document.getElementById("profession").value;
        const experience = document.getElementById("experience").value;
        const certifications = document.getElementById("certifications").value;
        const referees = document.getElementById("referees").value;
        const certificates = document.getElementById("certificates").files;
        const cv = document.getElementById("cv").files[0];

        // Upload documents to backend
        const formData = new FormData();
        formData.append("cv", cv);
        for (let i = 0; i < certificates.length; i++) {
            formData.append("certificates", certificates[i]);
        }

        const uploadRes = await fetch("http://localhost:5000/upload-documents", {
            method: "POST",
            body: formData
        });

        const uploadData = await uploadRes.json();

        const profileData = {
            fullName,
            profession,
            experience,
            certifications,
            referees,
            cvName: uploadData.cv || "Not uploaded",
            certificatesNames: uploadData.certificates || []
        };

        localStorage.setItem("userProfile", JSON.stringify(profileData));
        displayProfile(profileData);
    });

    function displayProfile(profile) {
        profileSection.style.display = "none";
        previewSection.style.display = "block";

        previewSection.innerHTML = `
            <h3>Your Profile</h3>
            <p><strong>Name:</strong> ${profile.fullName}</p>
            <p><strong>Profession:</strong> ${profile.profession}</p>
            <p><strong>Experience:</strong> ${profile.experience} years</p>
            <p><strong>Certifications:</strong> ${profile.certifications}</p>
            <p><strong>Referees:</strong> ${profile.referees}</p>
            <p><strong>Uploaded CV:</strong> <a href="${profile.cvName}" target="_blank">Download CV</a></p>
            <p><strong>Certificates:</strong><br>${profile.certificatesNames.map(name => `<a href="${name}" target="_blank">${name}</a>`).join("<br>")}</p>
            <button onclick="editProfile()">Edit Profile</button>
            <button onclick="fetchJobs()">Find Jobs</button>
        `;
    }

    window.editProfile = function () {
        localStorage.removeItem("userProfile");
        location.reload();
    }

    window.fetchJobs = async function () {
        jobSection.style.display = "block";
        jobList.innerHTML = "<p>Loading job recommendations...</p>";

        try {
            const response = await fetch("http://localhost:5000/jobs");
            const data = await response.json();
            jobList.innerHTML = "";

            data.jobs.forEach(job => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <strong>${job.title}</strong> - ${job.company} (${job.location})<br>
                    <button onclick="applyJob('${job.id}', '${job.title}', '${job.company}')">Apply</button>
                    <div class="guide" id="guide-${job.id}" style="display:none; margin-top:5px; font-size:14px;">
                        <p><strong>Application Steps:</strong></p>
                        <ol>
                            <li>Review job details</li>
                            <li>Ensure your profile is complete</li>
                            <li>Click “Apply” to submit</li>
                            <li>Check your email for follow-up</li>
                        </ol>
                    </div>
                `;
                jobList.appendChild(li);
            });
        } catch (error) {
            jobList.innerHTML = "<p>Failed to load jobs. Try again later.</p>";
        }
    }

    window.applyJob = function (jobId, title, company) {
        const guide = document.getElementById(`guide-${jobId}`);
        if (guide.style.display === "none") {
            guide.style.display = "block";
        } else {
            const confirmation = confirm(`Are you sure you want to apply for ${title} at ${company}?`);
            if (confirmation) {
                alert(`Application sent for ${title} at ${company}.`);
                // Optionally send data to backend
            }
        }
    }
});

function logout() {
    localStorage.removeItem("userProfile");
    window.location.href = "login.html";
}
