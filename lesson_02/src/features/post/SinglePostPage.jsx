import {useSelector} from 'react-redux'
import { selectPostById } from './postSlice'

import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButton'

import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function SinglePostPage(){
    const { postId } = useParams()
    const post = useSelector((state) => selectPostById(state,Number(postId)))

    if(!post){
        return (
            <section className='flex flex-col items-center justify-center min-h-screen'>
                <h2 className='font-bold text-xl text-red-600'>Post Not Found!!</h2>
            </section>
        )
    }

    return(
        <article className='flex flex-col items-center justify-center min-h-screen '>
            <h2 className='font-bold text-2xl capitalize'>{post.title}</h2>
            <p className='font-thin mt-2 max-w-[700px] tracking-tight'>{post.body}</p>
            <Link to={`/post/edit/${post.id}`} className='text-blue-600 underline'>Edit post</Link>
            <div className='flex flex-row gap-10 mt-4 justify-between'>
                <PostAuthor userId={post.userId}/>
                <TimeAgo timeStamp={post.date}/>
            </div>
            <ReactionButtons post={post}/>
        </article>
    )
}