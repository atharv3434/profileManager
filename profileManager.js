function applyTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark-theme");
        document.body.classList.remove("light-theme");
    } else {
        document.body.classList.add("light-theme");
        document.body.classList.remove("dark-theme");
    }
}

// Load profile data from local storage on page load
window.onload = () => {
    const savedProfile = JSON.parse(localStorage.getItem("userProfile"));
    if (savedProfile) {
        document.getElementById("name").value = savedProfile.name;
        document.getElementById("email").value = savedProfile.email;
        document.getElementById("theme").value = savedProfile.theme;
        applyTheme(savedProfile.theme);
    }

    // Update session visit count
    let visitCount = sessionStorage.getItem("visitCount");
    if (!visitCount) {
        visitCount = 1;
    } else {
        visitCount = parseInt(visitCount) + 1;
    }
    sessionStorage.setItem("visitCount", visitCount);
    document.getElementById("session-info").innerText = `Page visits this session: ${visitCount}`;
};

// Save profile to local storage
document.getElementById("save-btn").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const theme = document.getElementById("theme").value;

    if (!name || !email) {
        alert("Please fill in all fields.");
        return;
    }

    const userProfile = { name, email, theme };
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
    applyTheme(theme);
    alert("Profile saved successfully!");
});

// Clear profile from local storage
document.getElementById("clear-btn").addEventListener("click", () => {
    localStorage.removeItem("userProfile");
    document.getElementById("profile-form").reset();
    applyTheme("light");
    alert("Profile cleared!");
});