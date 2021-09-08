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

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return [];
  } else if (blogs.length === 1) {
    return blogs[0];
  } else {
    let favorite = blogs[0]
    for (let i = 1; i < blogs.length; i++) {
      if (blogs[i].likes > favorite.likes) {
        favorite = blogs[i]
      }
    }
    return favorite
  }
};

module.exports = { dummy, totalLikes, favoriteBlog };
