const dummy = blogs => blogs ? 1 : 1

const totalLikes = blogList => {
  const reduceTotalLikes = (totalLikes, blog) =>  totalLikes + blog.likes

  return blogList.reduce(reduceTotalLikes, 0)
}

const favoriteBlog = blogs => {
  const reduceFavBlog = (curFav, blog) => curFav.likes > blog.likes ?  { title: curFav.title, author: curFav.author, likes: curFav.likes } :
    { title: blog.title, author: blog.author, likes: blog.likes }

  return blogs.reduce(reduceFavBlog)
}

const mostBlogs = blogs => {
  const reduceBiggestBlogger = (prevBlog, blog) => prevBlog.blogs > blog.blogs ? prevBlog : blog

  const biggestBloggerObj = blogs.reduce(reduceBiggestBlogger)

  return {
    author: biggestBloggerObj.author,
    blogs: biggestBloggerObj.blogs
  }
}

const mostLikes = blogs => {

  // function to reduce blogs to an array of objects {author: <name>, likes: <total likes> }
  const reduceToAuthorAndLikes = (acc, blog) => {
    let newBlogObj = acc.find(b => blog.author === b.author)
    let newAcc
    if (!newBlogObj) {
      newBlogObj = { author: blog.author, likes: blog.likes }
      newAcc = acc.concat([newBlogObj])
    } else {
      newAcc = acc.map(b => b.author === newBlogObj.author ?  { author: blog.author, likes: newBlogObj.likes + blog.likes } : b  )
    }
    return newAcc
  }

  const arrayOfAuthorAndLikesObj = blogs.reduce(reduceToAuthorAndLikes, [])

  // find object with most likes

  const mostLikedAuthorObj =  arrayOfAuthorAndLikesObj.reduce((acc, cur) => acc. likes > cur.likes ? acc : cur)
  return mostLikedAuthorObj
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}