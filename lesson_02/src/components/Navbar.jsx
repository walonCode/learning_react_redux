import { Link } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import { increaseCount,getCount } from "../features/post/postSlice"

function Navbar() {
  const dispatch = useDispatch()
  const count = useSelector(getCount)
  return (
    <header className="sticky top-0 py-2 z-50">
        <nav className="text-center text-xl font-bold flex items-center justify-evenly mx-4">
            <p><Link to='/'>Home</Link></p>
            <p><Link to='post'>Post</Link></p>
            <p><Link to='user'>Users</Link></p>
            <button onClick={() => dispatch(increaseCount())}>
              {count}
            </button>
        </nav>
    </header>
  )
}

export default Navbar