import { useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addNewPost } from "./postSlice";
import { allUser } from "../users/userSlice";
import { useNavigate } from "react-router-dom";


export default function AddPostForm() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [userId, setUserId] = useState("")
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(allUser)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const canSave = [title,content,userId].every(Boolean) && addRequestStatus === 'idle';

    const handleSubmit = async(e) => {
        e.preventDefault()
       if(canSave){
        try{
            setAddRequestStatus('pending')
            await dispatch(addNewPost({title,body:content,userId})).unwrap()
            navigate('/')
            setTitle('')
            setContent('')
            setUserId('')
        }catch(error){
            console.error("fail to post",error)
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

    
  return (
    <section className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="text-center font-bold text-2xl">Add post</h3>
        <div className=""> 
            <form onSubmit={handleSubmit} className="flex flex-col cursor-pointer items-start justify-start">
                <label htmlFor="title" className="font-bold">Title</label>
                <input type="text" id="title"  className="border-2 py-1 px-1 w-[500px] border-black/50 " value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor="author">Author</label>
                <select  id="author" className="border-2 px-1 w-[150px]" value={userId} onChange={(e) => setUserId(e.target.value)}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="context" className="font-bold">Content</label>
                <textarea id="content"  className="border-2 py-3 px-1 w-[500px] border-black/50 " value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                <button disabled={!canSave} type="submit" className={ `${canSave ?  "border-blue-500  bg-blue-500 text-white " : "bg-gray-400 border-gray-400 text-black"} font-bold px-6 py-1 mt-5 rounded-md`}>Add Post</button>
            </form>
        </div>    
    </section>
  )
}
