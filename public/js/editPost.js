async function editForm(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="postTitle"]').value.trim();
    const textContent = document.querySelector('input[name="post"]').value.trim();
    console.log(title)
    console.log(textContent)

const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

const response = await fetch(`/api/posts/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
        post_id: id,
        title,
        textBody
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