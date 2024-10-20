function editUser() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === '' || password === '') {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const confirmEdit = confirm('Você realmente deseja editar suas informações?');
    if (confirmEdit) {
        // Aqui você pode adicionar a lógica para editar o usuário no backend
        alert('Informações editadas com sucesso!');
    }
}

function removeUser() {
    const confirmRemove = confirm('Você realmente deseja remover sua conta?');
    if (confirmRemove) {
        // Aqui você pode adicionar a lógica para remover o usuário no backend
        alert('Conta removida com sucesso!');
    }
}