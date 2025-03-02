import {  useSelector } from "react-redux"
import { selectPostId,getPostError,getPostStatus } from "./postSlice"

import PostExcerpt from './PostExcerpt'

export default function PostList() {
    const orderedPosts = useSelector(selectPostId);
    const postStatus = useSelector(getPostStatus);
    const postError  = useSelector(getPostError);

    let content;
    if(postStatus === 'loading'){
        content = <p>&quot;Loading ....&quot;</p>
    }else if (postStatus === 'succeeded'){
        content = orderedPosts.map(postId => <PostExcerpt key={postId} postId={postId}/>)
    }else if(postStatus === 'failed'){
        content = <p>{postError}</p>;
    }

    
  return (
    <section className="flex flex-col min-h-screen items-center justify-center">
        <h2 className="font-bold text-2xl">Posts</h2>
        {content}
    </section>
  )
}
