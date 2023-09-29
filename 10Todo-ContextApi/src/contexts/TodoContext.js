import { createContext,useContext } from "react"; // importing the context

export const TodoContext = createContext({
    todos:[
        {
            id:1,
            todo:"Learn React",
            completed:false,
        }
    ],
    addTodo:(todo)=>{},
    updateTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleCompletion:(id)=>{}
});

; // creating the context

// creating a custom hook to use the context
export const useTodo = ()=>{
    return useContext(TodoContext); 
} 


// creating a provider for the context
export const TodoProvider = TodoContext.Provider
