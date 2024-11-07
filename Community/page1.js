document.getElementById('postForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const comment = document.getElementById('comment').value;
    const imageUpload = document.getElementById('imageUpload').files[0];
    const postsContainer = document.getElementById('postsContainer');

    // Create a new post div
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    // Create a paragraph for the comment
    const commentText = document.createElement('p');
    commentText.textContent = comment;
    postDiv.appendChild(commentText);

    // If an image is uploaded, create an image element
    if (imageUpload) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(imageUpload);
        postDiv.appendChild(img);
    }

    // Create post action buttons
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('post-actions');

    // Create like button
    const likeButton = document.createElement('button');
    likeButton.textContent = 'Like';
    likeButton.classList.add('like-button');
    likeButton.onclick = function() {
        alert('You liked this post!');
    };
    actionsDiv.appendChild(likeButton);

    // Create dislike button
    const dislikeButton = document.createElement('button');
    dislikeButton.textContent = 'Dislike';
    dislikeButton.classList.add('dislike-button');
    dislikeButton.onclick = function() {
        alert('You disliked this post!');
    };
    actionsDiv.appendChild(dislikeButton);

    // Create share button
    const shareButton = document.createElement('button');
    shareButton.textContent = 'Share';
    shareButton.classList.add('share-button');
    shareButton.onclick = function() {
        alert('Post shared!');
    };
    actionsDiv.appendChild(shareButton);

    // Append actions to post
    postDiv.appendChild(actionsDiv);

    // Append the new post to the posts container
    postsContainer.appendChild(postDiv);

    // Clear the form fields
    document.getElementById('comment').value = '';
    document.getElementById('imageUpload').value = '';
});
