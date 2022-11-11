const signupHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#userNameSignup').value.trim();
    const email = document.querySelector('#eamilSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    if(name && email && password) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                name,
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
document.querySelector('.appForm').addEventListener('submit', signupHandler);