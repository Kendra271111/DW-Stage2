import TodoList from "@/components/list/todoList";
import TodoForm from "@/components/form/todoForm";

function App() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-8 gap-6">
      <h1 className="text-2xl font-bold">Todo App</h1>
      <TodoForm />
      <TodoList />
    </div>
  )
}

export default App
