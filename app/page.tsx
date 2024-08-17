'use client';

import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import { useRef, useState } from "react";

type Todo = {
    completed: boolean;
    text: string;
};

function Home() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function addTodo() {
        if (inputRef.current) {
            if (!inputRef.current?.value.trim()) return;
            const text: string = inputRef.current.value;
            const newItem = { completed: false, text };
            setTodos([...todos, newItem]);
            inputRef.current.value = "";
        }
    }
    function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
        if (event.key === "Enter") {
            addTodo();
        }
    }

    function handleItemDon(index: number) {
        const newTodos = [...todos];
        newTodos[index].completed = !newTodos[index].completed;
        setTodos(newTodos);
    }

    function handleItemDelete(index: number) {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    }

    return (
        <main className="bg-gray-800 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl p-4 bg-black rounded-lg shadow-lg outline outline-offset-2 outline-red-900 hover:shadow-2xl hover:outline-red-600 hover:shadow-red-500 transition-all duration-700">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center text-white mb-6">To Do List</h1>
                <div className="flex space-x-2">
                    <input
                        className="flex-1 outline-none border-none bg-red-800 rounded-lg p-2 text-white"
                        placeholder='Add todo... '
                        ref={inputRef}
                        type="text"
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        className="bg-red-800 rounded-lg outline-none px-3 py-2 hover:bg-red-700 hover:shadow-lg hover:shadow-red-900 transition-all duration-300"
                        onClick={addTodo}
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-col space-y-3 pt-2">
                    <ul className="space-y-2">
                        {todos.map(({ text, completed }, index) => (
                            <div className="flex justify-between items-center" key={index}>
                                <li
                                 className={`flex text-1xl px-4 mt-1 break-words truncate w-5/6 min-h-6 max-h-12 cursor-pointer hover:px-3 transition-all duration-150 ${completed ? "line-through" : ""}`}
                                 onClick={() => handleItemDon(index)}
                                >
                                    {text}
                                </li>
                                <span>
                                    <i
                                        className='fa-solid fa-x mx-2 hover:text-red-600 transition-all duration-200 cursor-pointer'
                                        onClick={() => handleItemDelete(index)}
                                    ></i>
                                </span>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    );
}

export default Home;
