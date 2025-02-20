const correctPasswordHash = "5e884898da28047151d0e56f8dc6292773603d0d6aabbddc2f6f94e774b7b53";

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function checkPassword() {
    const passwordInput = document.getElementById("password").value;
    const hash = await sha256(passwordInput);

    if (hash === correctPasswordHash) {
        localStorage.setItem("authenticated", "true");
        window.location.href = "gallery.html";
    } else {
        document.getElementById("error-message").innerText = "Неверный пароль!";
    }
}

function verifyAccess() {
    if (localStorage.getItem("authenticated") !== "true") {
        window.location.href = "index.html";
    }
}

function logout() {
    localStorage.removeItem("authenticated");
    window.location.href = "index.html";
}
