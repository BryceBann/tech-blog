const newPost = async(event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value;
    const textBody = document.querySelector('input[name="content"]').value;

    const response = await fetch(`/api/post`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            textBody
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if(response.ok) {
        document.location.replace('/dashboard');
    }else{
        alert(response.statusText);
    }
};

document.querySelector('#newPostForm').addEventListener('click', newPost);