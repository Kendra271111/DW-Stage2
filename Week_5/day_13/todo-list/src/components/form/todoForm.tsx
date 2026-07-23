import { useTodo } from "@/hooks/useTodo";
import React, { useState } from "react";
import { Button as ShadcnButton } from "../ui/button";

export default function TodoForm() {
    const [text, setText] = useState('');
    const {createTodo, loading} = useTodo();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if(!text.trim()) return;
        createTodo(text)
        setText('')
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border"
            disabled={loading}
            placeholder="Add new task..."
            ></input>

            <ShadcnButton type="submit" disabled={loading} className="ml-4">Add</ShadcnButton>
        </form>
    )
}