import { useParams,useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { selectPostById, updatePost,deletePost } from "./postSlice"
import { allUser } from '../users/userSlice'
import { useState } from "react"


function EditPostForm() {
    const { postId }  = useParams()
    const navigate = useNavigate()

    const post = useSelector((state) => selectPostById(state,Number(postId)))
    const users = useSelector(allUser)

    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const dispatch = useDispatch()

    if(!post){
        return(
            <section className="flex flex-col items-center justify-center min-h-screen">
                <p className="text-xl text-red-500 font-bold"> Post Not Found!!</p>
            </section>
        )
    }
    const canSave = [title,content,userId].every(Boolean) && addRequestStatus === 'idle';

    const onSubmit = async(e) => {
        e.preventDefault()
        if(canSave){
            try{
                setAddRequestStatus('pending')
                await dispatch(updatePost({id:post.id, title,body:content,userId,reactions:post.reactions})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            }catch(error){
                console.error(error)
            }finally{
                setAddRequestStatus('idle')
            }
        }
    }

    const userOptions = users.map(user => (
        <option className="font-bold flex flex-col" key={user.id} value={user.id} >
            {user.name}
        </option>
    ))

    const onDeletePostClick = async() => {
        try{
            setAddRequestStatus("pending")
            await dispatch(deletePost({id:postId})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        }catch(error){
            console.error('failed to delete post',error)
        }finally{
            setAddRequestStatus('idle')
        }
    }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="text-center font-bold text-2xl">Edit post</h3>
        <div className=""> 
            <form onSubmit={onSubmit} className="flex flex-col gap-2 cursor-pointer items-start justify-start">
                <label htmlFor="title" className="font-bold">Title</label>
                <input type="text" id="title"  className="border-2 py-1 px-1 w-[500px] border-black/50 " value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="author">Author</label>
                <select  id="author" className="border-2 px-1 w-[150px]" value={userId} onChange={(e) => setUserId(e.target.value)}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="context" className="font-bold">Content</label>
                <textarea id="content" rows={5}  className="border-2 py-3 px-1 w-[500px] border-black/50 " value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <div className="flex gap-4">
                <button disabled={!canSave} type="submit" className={ `${canSave ?  "border-blue-500  bg-blue-500 text-white " : "bg-gray-400 border-gray-400 text-black"} font-bold px-6 py-1 mt-5 rounded-md`}>save post</button>
                <button className="bg-red-600 border-2 border-red-600 py-1 text-white rounded-md font-bold px-6 mt-5" type="button" onClick={onDeletePostClick}>Delete Post</button>
                </div>
            </form>
        </div>    
    </section>
  )
}

export default EditPostForm