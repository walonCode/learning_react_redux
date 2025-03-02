import { useSelector } from "react-redux";
import { selectUserById } from "./userSlice";
import { selectAllPost, selectPostByUser } from "../post/postSlice";
import { Link, useParams } from "react-router-dom";

export default function UserPage(){
    const { userId } = useParams()
    const user = useSelector(state => selectUserById(state, Number(userId)))

    const postForUser = useSelector(state => selectPostByUser(state, Number(userId)))

    const postTitles = postForUser.map((post,index) => (
        <li className="flex items-center gap-2 justify-center" key={post.id}>
            <Link to={`/post/${post.id}`}><span className="font-bold mr-2">{index + 1}.</span>{post.title}</Link>
        </li>
    ))

    return(
        <section className="flex flex-col items-center justify-center min-h-screen gap-2">
            <h2 className="font-bold text-3xl">{user?.name}</h2>
            <ol>{postTitles}</ol>
        </section>
    )
}