const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    let total = 0;
    blogs.forEach((blog) => {
      total += blog.likes;
    });
    return total;
  }
};

module.exports = { dummy, totalLikes };
