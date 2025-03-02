import { useSelector } from "react-redux";
import { allUser } from "../users/userSlice";
import { Link } from "react-router-dom";


export default function PostAuthor({ userId }){
    const users = useSelector(allUser)
    const author = users.find(user => user.id === Number(userId))

    return <span>by <b><Link to={`/user/${userId}`}>{author ? author.name : "Unknown author"}</Link></b></span>
}