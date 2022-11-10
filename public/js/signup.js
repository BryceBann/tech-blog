const signupHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#userNameSignup').value.trim();
    const email = document.querySelector('#eamilSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    if(username && email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });
        if(response.ok) {
            console.log('you are now signed up');
            document.location.replace('/dashboard');
        }else{
            alert(response.statusText);
        }
    }
}
console.log(body)
document.querySelector('#appForm').addEventListener('submit', signupHandler);