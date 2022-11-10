const editForm = async (event) => {
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value
    const textContent = document.querySelector('input[name="post"]').value

const id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        post_id: id,
        title,
        textContent
    }),
    headers: {
        'content-Type': 'application/json'
    }
});

if(response.ok) {
    document.location.replace('/dashboard/');
}else{
    alert(response.statusText);
}
} 

document.querySelector('#editPost').addEventListener('submit', editForm)