const newComment = async (event) => {
    event.preventDefault();

    const commentBody = document.querySelector('textarea[name="commentBody"]').value.trim();

    const postId = window.location.toString().split('/')[window.location.toString().split('/').length - 1];

    if (commentBody) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                postId,
                commentBody
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText)
        }
    }
}

document.querySelector('.new-comment').addEventListener('submit', newComment)