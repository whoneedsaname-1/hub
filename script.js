document.addEventListener('DOMContentLoaded', () => {
    // Card Tilt Effect
    const cards = document.querySelectorAll('.game-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // Auth Logic
    const modal = document.getElementById('authModal');
    const loginBtn = document.getElementById('loginBtn');
    const closeBtn = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');

    // User State Elements
    const userInfo = document.getElementById('userInfo');
    const userNameDisplay = document.getElementById('userNameDisplay');
    const logoutBtn = document.getElementById('logoutBtn');

    // Check if user is logged in
    checkLoginState();

    // Modal Events
    loginBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    // Switch Forms
    showRegister.addEventListener('click', (e) => {
        e.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Handle Register
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('regUser').value;
        const pass = document.getElementById('regPass').value;

        if (localStorage.getItem(user)) {
            alert('שם משתמש זה כבר תפוס');
            return;
        }

        localStorage.setItem(user, JSON.stringify({ password: pass }));
        login(user);
        modal.classList.add('hidden');
        registerForm.reset();
        alert('נרשמת בהצלחה!');
    });

    // Handle Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('loginUser').value;
        const pass = document.getElementById('loginPass').value;

        const storedUser = localStorage.getItem(user);

        if (storedUser) {
            const userData = JSON.parse(storedUser);
            if (userData.password === pass) {
                login(user);
                modal.classList.add('hidden');
                loginForm.reset();
            } else {
                alert('סיסמה שגויה');
            }
        } else {
            alert('משתמש לא נמצא');
        }
    });

    // Handle Logout
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('currentUser');
        checkLoginState();
    });

    function login(username) {
        localStorage.setItem('currentUser', username);
        checkLoginState();
    }

    function checkLoginState() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            loginBtn.classList.add('hidden');
            userInfo.classList.remove('hidden');
            userNameDisplay.textContent = currentUser;
        } else {
            loginBtn.classList.remove('hidden');
            userInfo.classList.add('hidden');
            userNameDisplay.textContent = '';
        }
    }
});
