document.addEventListener("DOMContentLoaded", function () {
    const storyList = document.getElementById("storyList");
    const addStoryForm = document.getElementById("addStoryForm");
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const contentInput = document.getElementById("content");

    let stories = JSON.parse(localStorage.getItem("stories")) || [];

    function saveStories() {
        localStorage.setItem("stories", JSON.stringify(stories));
        renderStories();
    }

    function renderStories() {
        storyList.innerHTML = "";
        stories.forEach((story, index) => {
            const li = document.createElement("li");
            li.innerHTML = `<strong>${story.title}</strong> by ${story.author}
                <button onclick="editStory(${index})">Edit</button>
                <button onclick="deleteStory(${index})">Delete</button>`;
            storyList.appendChild(li);
        });
    }

    window.editStory = function (index) {
        const story = stories[index];
        titleInput.value = story.title;
        authorInput.value = story.author;
        contentInput.value = story.content;

        addStoryForm.onsubmit = function (event) {
            event.preventDefault();
            stories[index] = {
                title: titleInput.value,
                author: authorInput.value,
                content: contentInput.value,
            };
            saveStories();
            addStoryForm.reset();
            addStoryForm.onsubmit = addNewStory;
        };
    };

    window.deleteStory = function (index) {
        if (confirm("Are you sure you want to delete this story?")) {
            stories.splice(index, 1);
            saveStories();
        }
    };

    function addNewStory(event) {
        event.preventDefault();
        const newStory = {
            title: titleInput.value,
            author: authorInput.value,
            content: contentInput.value,
        };
        stories.push(newStory);
        saveStories();
        addStoryForm.reset();
    }

    addStoryForm.onsubmit = addNewStory;
    renderStories();
});
