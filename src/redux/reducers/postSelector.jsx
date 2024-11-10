import { createSelector } from "@reduxjs/toolkit";

export const selectAllPosts = (state) => state.posts.postsArray;

export const selectIsLoading = (state) => state.posts.isLoading;

export const selectPostError = (state) => state.posts.error;

export const selectUsersPosts = (userId) =>
  createSelector([selectAllPosts], (posts) =>
    posts.filter((post) => post.userId === userId)
  );
  
export const selectPostById = (postId) =>
  createSelector([selectAllPosts], (posts) =>
    posts.find((post) => post.id === postId)
  );
