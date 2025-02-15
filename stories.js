document.addEventListener("DOMContentLoaded", function () {
    fetch("stories.json")
        .then(response => response.json())
        .then(data => {
            const storyList = document.getElementById("story-list");
            data.forEach(story => {
                const storyElement = document.createElement("div");
                storyElement.classList.add("story");
                storyElement.innerHTML = `
                    <h3>${story.title}</h3>
                    <p><strong>By:</strong> ${story.author} | <strong>Date:</strong> ${story.date}</p>
                    <p>${story.content}</p>
                `;
                storyList.appendChild(storyElement);
            });
        })
        .catch(error => console.error("Error loading stories:", error));
});
