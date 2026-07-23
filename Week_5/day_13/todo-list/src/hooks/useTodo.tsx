import { TodoContext } from "@/context/todoContext";
import { useContext } from "react";

export const useTodo = () => {

    const context = useContext(TodoContext);
    if (!context){
        throw new Error("useTodo  must be used within a Provider")
    }
    return context
}
