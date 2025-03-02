import PostList from "./features/post/PostList";
import Layout from "./components/Layout";
import SinglePostPage from './features/post/SinglePostPage'
import AddPostForm from "./features/post/AddPostForm";
import EditPostForm from './features/post/EditPostForm'
import UserList from "./features/users/UserList";
import UserPage from "./features/users/UserPage";
import { Route, Routes, Navigate } from "react-router-dom";

export default function App(){
  return(
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<PostList/>}/>

        <Route path='post'>
          <Route index element={<AddPostForm/>}/>
          <Route path=":postId" element={<SinglePostPage/>}/>
          <Route path='edit/:postId' element={<EditPostForm/>}/>
        </Route>

        <Route path='user'>
          <Route index element={<UserList/>}/>
          <Route path=':userId' element={<UserPage/>}/>
        </Route>

        <Route path='*' element={<Navigate to='/' replace />}/>
      </Route>
    </Routes>
  )
}