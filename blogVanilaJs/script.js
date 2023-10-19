const addBlogBtn = document.getElementById("add-blog");
const modal = document.getElementById("add-blog-modal");
const addBlogForm = document.getElementById("add-blog-form");
const closeModal = document.getElementById("close-modal");

//add blog
addBlogBtn.addEventListener("click", () => {
  modal.style.display = "block";
});

//close modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

//form submit
addBlogForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.getElementById("blog-title").value;
  const author = document.getElementById("author").value;
  const blogImage = document.getElementById("blog-image").value;
  const blogDesc = document.getElementById("blog-desc").value;

  addBlogPost(title, author, blogImage, blogDesc);

  document.getElementById("blog-title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("blog-image").value = "";
  document.getElementById("blog-desc").value = "";
});

function addBlogPost(title, author, blogImage, blogDesc) {
  const blogPost = document.createElement("div");
  blogPost.className = "blog-post";
  blogPost.innerHTML = `
  <img src="${blogImage}" alt="Blog Image">   
  <h2>${title}</h2>
        <p><strong>Posted by:</strong> ${author}</p>
        
        <p>${blogDesc}</p>
        <button class="read-more">Read More</button>
    `;

  blogPost.querySelector(".read-more").addEventListener("click", () => {
    window.location.href = `blog.html?title=${encodeURIComponent(title)}`;
  });

  // Append the new blog post to the blog list
  const blogList = document.getElementById("blog-list");
  blogList.appendChild(blogPost);
  modal.style.display = "none";

  saveToLocalStorage({ title, author, blogImage, blogDesc });
}

// Function to save data in LocalStorage
function saveToLocalStorage(blogData) {
  const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.push(blogData);
  localStorage.setItem("blogs", JSON.stringify(blogs));
}
