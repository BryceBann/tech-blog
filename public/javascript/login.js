const login = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#emailLogin').value.trim();
    const password = document.querySelector('#passwordLogin').Value.trim();

    if(email && password) {
        const response = await fetch(`/api/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            console.log('you are now logged in')
            document.location.replace('/')
        }else{
            alert(response.statusText);
        }
    }
}
document.querySelector('.login-form').addEventListener('submit', login);