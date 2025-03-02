import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import ReactionButton from "./ReactionButton"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPostById } from "./postSlice"

const PostExcerpt = ({ postId }) => {
  const post = useSelector(state => selectPostById(state, postId))
  return (
     <article className="flex flex-col border-2 py-3 max-w-[500px] px-8 my-2 ">
        <h3><span className="font-bold">Title: </span>{post.title}</h3>
        <p><span className="font-bold">Content: </span>{post.body.substring(0,50)}</p>
        <div className="flex flex-col items-center justify-between mt-2">
          <Link to={`post/${post.id}`} className="text-[15px] font-bold text-blue-600 underline">view post</Link>
          <div className="flex gap-6">
          <PostAuthor userId={post.userId}/>
          <p>createdAt:<b><TimeAgo timeStamp={post.date}/></b></p>
          </div>
        </div>
        <ReactionButton post={post}/>
    </article>
  )
}


export default PostExcerpt