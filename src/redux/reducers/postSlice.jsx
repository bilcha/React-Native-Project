import { createSlice } from "@reduxjs/toolkit";
import { getPosts, createPost, addComment, toggleLike } from "./postOperation";

const initialState = {
  postsArray: [],
  error: null,
  isLoading: false,
};

const handlePending = (state) => {
  state.isLoading = true;
  state.error = null;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.error.message;
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, handlePending)
      .addCase(getPosts.fulfilled, (state, action) => {
        state.postsArray = action.payload ?? [];
        state.isLoading = false;
      })
      .addCase(getPosts.rejected, handleRejected)

      .addCase(createPost.pending, handlePending)
      .addCase(createPost.fulfilled, (state, action) => {
        state.postsArray.push({ ...action.payload, likes: [] });
        state.isLoading = false;
      })
      .addCase(createPost.rejected, handleRejected)

      .addCase(addComment.pending, handlePending)
      .addCase(addComment.fulfilled, (state, action) => {
        const post = state.postsArray.find(
          (post) => post.id === action.payload.postId
        );
        if (post) {
          post.comments = [...(post.comments ?? []), action.payload.comment];
        }
        state.isLoading = false;
      })
      .addCase(addComment.rejected, handleRejected)

      .addCase(toggleLike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const post = state.postsArray.find(
          (post) => post.id === action.payload.postId
        );
        if (post) {
          post.likedBy = post.likedBy ?? [];
          const userIndex = post.likedBy.indexOf(action.payload.userId);
          if (userIndex !== -1) {
            post.likedBy.splice(userIndex, 1);
          } else {
            post.likedBy.push(action.payload.userId);
          }
          post.likes = post.likedBy.length;
        }
        state.isLoading = false;
      })
      .addCase(toggleLike.rejected, handleRejected);
  },
});

export const postReducer = postsSlice.reducer;
