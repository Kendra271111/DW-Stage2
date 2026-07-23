import { useTodo } from "@/hooks/useTodo"
import type { Todo } from "../../types/todo"
import { useState } from "react"

export const TodoItem = ({ todo }: { todo: Todo }) => {
    const { updateTodo, deleteTodo, toggleComplete, loading } = useTodo()
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(todo.text)

    const handleUpdate = () => {
        updateTodo(todo.id, text)
        setIsEditing(false)
    }

    return (
        <div className="flex items-center gap-5 justify-center mt-10">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                disabled={loading}
            />
            {isEditing ? (
                <>
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border px-2 py-1 rounded"
                        disabled={loading}
                    />
                    <button onClick={handleUpdate} disabled={loading} className="text-green-600">Save</button>
                </>
            ) : (
                <>
                    <span style={{ textDecoration: todo.completed ? "line-through" : "none" }}>
                        {todo.text}
                    </span>
                    <button onClick={() => setIsEditing(true)} disabled={loading} className="text-blue-600">Edit</button>
                </>
            )}
            <button onClick={() => deleteTodo(todo.id)} disabled={loading} className="text-red-600">Delete</button>
        </div>
    )
}
