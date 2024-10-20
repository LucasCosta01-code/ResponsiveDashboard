document.addEventListener('DOMContentLoaded', () => {
    const drawCardButton = document.getElementById('draw-card');
    const cardResult = document.getElementById('card-result');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const logoutLink = document.getElementById('logout');
    const userNameSpan = document.getElementById('user-name');
    const adminLink = document.getElementById('admin-link');
    const userListContainer = document.getElementById('user-list-container');
    const userList = document.getElementById('user-list');
    const editUserForm = document.getElementById('edit-user-form');
    const removeUserForm = document.getElementById('remove-user-form');

    if (drawCardButton) {
        drawCardButton.addEventListener('click', () => {
            const cardValues = ['Ás', 'Rei', 'Rainha', 'Valete'];
            const cardSuits = ['Espadas', 'Copas', 'Ouros', 'Paus'];
            const randomValue = cardValues[Math.floor(Math.random() * cardValues.length)];
            const randomSuit = cardSuits[Math.floor(Math.random() * cardSuits.length)];
            cardResult.textContent = `Você tirou: ${randomValue} de ${randomSuit}`;
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = sanitizeInput(document.getElementById('username').value);
            const password = sanitizeInput(document.getElementById('password').value);

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(user => user.username === username && user.password === hashPassword(password));

            if (user) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', username);
                alert('Login bem-sucedido!');
                window.location.href = 'index.html';
            } else {
                alert('Usuário ou senha incorretos.');
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = sanitizeInput(document.getElementById('username').value);
            const password = sanitizeInput(document.getElementById('password').value);

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userExists = users.some(user => user.username === username);

            if (userExists) {
                alert('Usuário já existe.');
            } else {
                users.push({ username, password: hashPassword(password) });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registro bem-sucedido! Faça login.');
                window.location.href = 'login.html';
            }
        });
    }

    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault();
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            window.location.href = 'login.html';
        });
    }

    if (userNameSpan) {
        const username = localStorage.getItem('username');
        if (username) {
            userNameSpan.textContent = `Bem-vindo, ${username}`;
            if (username === 'admin' && adminLink) {
                adminLink.style.display = 'inline';
            }
        }
    }

    if (userListContainer && userList) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = user.username;
            userList.appendChild(li);
        });
    }

    if (editUserForm) {
        editUserForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const oldUsername = sanitizeInput(document.getElementById('old-username').value);
            const newUsername = sanitizeInput(document.getElementById('new-username').value);
            const newPassword = sanitizeInput(document.getElementById('new-password').value);

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.username === oldUsername);

            if (userIndex !== -1) {
                if (confirm('Você realmente deseja editar este usuário?')) {
                    users[userIndex].username = newUsername;
                    users[userIndex].password = hashPassword(newPassword);
                    localStorage.setItem('users', JSON.stringify(users));
                    alert('Usuário editado com sucesso!');
                    window.location.reload();
                }
            } else {
                alert('Usuário não encontrado.');
            }
        });
    }

    if (removeUserForm) {
        removeUserForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const username = sanitizeInput(document.getElementById('remove-username').value);

            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.username === username);

            if (userIndex !== -1) {
                if (confirm('Você realmente deseja remover este usuário?')) {
                    users.splice(userIndex, 1);
                    loc2alStorage.setItem('users', JSON.stringify(users));
                    alert('Usuário removido com sucesso!');
                    window.location.reload();
                }
            } else {
                alert('Usuário não encontrado.');
            }
        });
    }

    function sanitizeInput(input) {
        const element = document.createElement('div');
        element.innerText = input;
        return element.innerHTML;
    }

    function hashPassword(password) {
        // Simulação de hashing de senha. Em um ambiente real, use uma biblioteca de hashing segura.
        return btoa(password); // Base64 encoding como exemplo (não use em produção)
    }
});