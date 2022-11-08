async function loginForm(event) {
    event.preventDefault();

    const username = document.querySelector('usernameLogin').value.trim();
    const password = document.querySelector('passwordLogin').Value.trim();

    if(username && password) {
        const login = await fetch('/api/user/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            header: {'content-Type': 'application/json'}
        });
        if(login.ok) {
            console.log('you are now logged in')
            document.location.replace('/dashboard')
        }else{
            alert(response.statusText);
        }
    }
}
console.log(body)
document.querySelector('#loginForm').addEventListener('submit', loginForm);