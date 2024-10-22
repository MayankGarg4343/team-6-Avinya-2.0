document.addEventListener('DOMContentLoaded', () => {
    const commentForm = document.getElementById('comment-form');
    const commentsContainer = document.getElementById('comments-container');
    
    loadComments();

    commentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const commentText = document.getElementById('comment').value;

        if (username && commentText) {
            const comment = {
                username: username,
                text: commentText,
                timestamp: new Date().toLocaleString()
            };

            saveComment(comment);
            displayComment(comment);
            commentForm.reset();
        }
    });

    function saveComment(comment) {
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(comment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    function loadComments() {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.forEach(displayComment);
    }

    function displayComment(comment) {
        const commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<strong>${comment.username}</strong> <em>${comment.timestamp}</em><p>${comment.text}</p>`;
        commentsContainer.appendChild(commentDiv);
    }
});