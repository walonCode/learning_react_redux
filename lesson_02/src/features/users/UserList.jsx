import { useSelector } from "react-redux";
import { allUser } from "./userSlice";
import { Link } from "react-router-dom";

export default function UserList(){
    const users = useSelector(allUser)
    
    const renderedUsers = users.map((user,index) => (
        <li className="flex items-center justify-center " key={user.id}>
            <Link to={`/user/${user.id}`}><span className="font-bold mr-2">{index + 1}.</span>{user.name}</Link>
        </li>
    ))

    return(
        <section className="flex flex-col gap-2 items-center justify-center min-h-screen">
            <h2 className="font-bold text-3xl">Users</h2>
            <ul>{renderedUsers}</ul>
        </section>
    )
}