export const postsRepo = {
  getAllPosts() {
    return "All posts";
  },
  getSinglePost(id: string) {
    return "Single post";
  },
  createPost(data: string) {
    return "Created post";
  },
  updatedPost(id: string) {
    return "Updated post";
  },
  deletedPost(id: string) {
    return "Delete post";
  },
};
