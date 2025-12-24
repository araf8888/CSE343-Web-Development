// api/api.js

// In-memory data store
let posts = [
  {
    id: 1,
    name: "Hello World",
    content: "This is the first post!",
  },
  {
    id: 2,
    name: "Mini Twitter",
    content: "This is a mock REST API.",
  }
];

let comments = {
  1: [
    { comment: "Nice post!" },
    { comment: "Welcome to the platform!" }
  ],
  2: []
};

// Auto-increment counters
let nextPostId = 3;


// ------------------------------
// GET ALL POSTS
// ------------------------------
export const getAllPosts = async () => {
  try {
    return [...posts]; // return a copy
  } catch (err) {
    console.error("Error in getAllPosts:", err);
    throw err;
  }
};


// ------------------------------
// GET POST DETAILS
// ------------------------------
export const getPostDetails = async (postId) => {
  try {
    const post = posts.find((p) => p.id === Number(postId));
    if (!post) throw new Error("Post not found.");

    const postComments = comments[postId] || [];

    return {
      post,
      comments: [...postComments],
    };
  } catch (err) {
    console.error("Error in getPostDetails:", err);
    throw err;
  }
};


// ------------------------------
// CREATE NEW POST
// ------------------------------
export const createNewPost = async (newPostData) => {
  try {
    const newPost = {
      id: nextPostId++,
      name: newPostData.name,
      content: newPostData.content,
    };

    posts.push(newPost);
    comments[newPost.id] = [];

    return newPost;
  } catch (err) {
    console.error("Error in createNewPost:", err);
    throw err;
  }
};


// ------------------------------
// CREATE NEW COMMENT
// ------------------------------
export const createNewComment = async (postId, newCommentData) => {
  try {
    if (!comments[postId]) comments[postId] = [];

    comments[postId].push({
      comment: newCommentData.comment,
    });

    return { success: true };
  } catch (err) {
    console.error("Error in createNewComment:", err);
    throw err;
  }
};
