const commentForm = async (event) => {
    event.preventDefault();

    const commentBody = document.querySelector('input[name="commentBody"]').value.trim();

    const post_id = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if(commentBody) {
        const response = await fetch('/api/comments', {
            method: 'PUT',
            body: JSON.stringify({
                post_id,
                commentBody
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.ok) {
            document.location.reload();
        }else{
            alert(response.statusText)
        }
    }

}

document.querySelector('.comment-form').addEventListener('submit', commentForm);