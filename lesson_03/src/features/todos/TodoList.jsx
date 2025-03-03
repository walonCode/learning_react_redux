import { useState } from "react"
import { useGetTodosQuery,useAddTodoMutation,useDeleteTodoMutation,useUpdateTodoMutation } from "../api/apiSlice"
import {Trash} from 'lucide-react'

export default function TodoList() {
    const [newTodo, setNewTodo] = useState("")

    const {
        data:todos,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation()
    const [updateTodo] = useUpdateTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(newTodo)
        addTodo({userId:1, title:newTodo, completed:false})
        setNewTodo("")
    }

    const newItemSelection = <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo" className="font-thin text-lg">Enter a new todo</label>
        <div>
            <input 
            className="border-2 border-black/50 mt-1 w-[500px] px-1 py-2 rounded-md"
            type="text" 
            id='new-todo'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Enter a new todo"
            />
        </div>
        <button className="font-bold text-white rounded-md bg-blue-600 border-2 border-blue-600 mt-4 py-1 px-6">Add todo</button>
    </form>

    let content;
    if(isLoading){
        content = <p>Loading....</p>
    }else if(isSuccess){
        content = todos.map(todo => {
            return(
                <article key={todo.id} className="flex gap-4 items-center justify-between my-4 border-2 py-2 border-black/50 w-[400px] px-2 ">
                    <div>
                        <input type="checkbox" checked={todo.completed} id={todo.id} onChange={() => updateTodo({...todo, completed:!todo.completed})}/>
                    </div>
                    <label htmlFor={todo.id} className={`${todo.completed === true ? "line-through" : ""} font-bold `}>{todo.title}</label>
                    <button onClick={() => deleteTodo({ id :todo.id })}>
                        <Trash size={24} color='red'/>
                    </button>
                </article>
            )
        })
    }else if (isError){
        content = <p>{error}</p>
    }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="font-bold text-3xl my-4 text-blue-400">Todo List</h1>
        {newItemSelection}
        <div className="border-2 my-4 py-8 px-15 ">
            {content}
        </div>
    </main>
  )
}
