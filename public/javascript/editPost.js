const editPost = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('input[name="post-title"]').value;
    const postBody = document.querySelector('input[name="post-body"]').value;
    const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            postBody
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText)
    }
}

document.querySelector('.edit-post').addEventListener('submit', editPost);