export const blogsRepo = {
  getAllBlogs() {
    return "All blogs";
  },
  getSingleBlog(id: string) {
    return "Single blog";
  },
  createBlog(data: string) {
    return "Created blog";
  },
  updatedBlog(id: string) {
    return "Updated blog";
  },
  deletedBlog(id: string) {
    return "Delete blog";
  },
};
