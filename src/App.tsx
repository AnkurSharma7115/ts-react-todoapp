import React, { useState } from "react";
import "./App.css";

type FormEle = React.FormEvent<HTMLFormElement>;

interface ITodo {
    text: string;
    complete: boolean;
}

function App(): JSX.Element {
    const [value, setValue] = useState<string>("");
    const [todos, setTodos] = useState<ITodo[]>([]);

    const handleSubmit = (e: FormEle): void => {
        e.preventDefault();
        addTodo(value);
        setValue("");
    };

    const addTodo = (text: string) :void => {
        const newTodo: ITodo[] = [...todos, { text, complete: false }];
        setTodos(newTodo);
    };

    const completeTodo = (index: number) :void => {
      const newTodo: ITodo[] = [...todos]
      newTodo[index].complete = !newTodo[index].complete
      setTodos(newTodo)
    }

    const delTodo = (index: number) : void => {
      const newTodo : ITodo[] = [...todos]
     newTodo.splice(index, 1)
     setTodos(newTodo)
    }

    return (
        <div className="App">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    required
                />
                <button type="submit">AddToDo</button>
            </form>
            <section>
                {todos.map((todo: ITodo, index: number) => (
                    <div key={index} >
                        <div style={{ textDecoration: todo.complete ? "line-through" : "", display:'inline-block', margin:'2px', paddingRight: '5px' }}>
                            {todo.text}
                        </div>
                        <div style={{display: 'inline'}}> 
                          <button type="button" onClick={() => completeTodo(index)}>
                            {" "}{todo.complete ? "Incomplete" : "Complete"}{" "}
                        </button>
                        <button type='button' onClick={() => delTodo(index)}>&times;</button>
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default App;
