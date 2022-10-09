import {useEffect, useState} from 'react'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'

const SingleTodo = () => {
    const [todo , setTodo] = useState("");
    const [search, setSearch] = useState("");
    const [mytodo, setMytodo] = useState([]);
    const [edit, setEdit] = useState(null);
    const [edited , setEdited] = useState(0);

    const searchChange = (e) => {
        console.log('searching todo');
    }
    const todoChange = (e) =>{
        const {value} = e.target;
        setTodo(value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        

        if(edited){
            const updateTodo = mytodo.map(currVal => currVal.id === edited ? (currVal = {todo, id:currVal.id}) : currVal)

            setMytodo(updateTodo);
            setTodo("")
            setEdited(0)
            return;
        }
        if(todo) {
            const id = new Date().getTime().toString();
            const newTodo = {...todo,id};
            setMytodo([...mytodo ,newTodo])
            setTodo({makeTodo : ""})
        }
    }
    // ! Delete Todo:
    const deleteTodo = (id) => {
        setMytodo(remTodo => remTodo.filter(toodo => toodo.id !== id))
    }
    // ? Edit Todo:
    const editTodo = (id) => {
       const a = mytodo.find(to => to.id === id);
       const {todo:edittodo , id: editId} = a
        setEdited(editId)
       setTodo(edittodo)
    }
    useEffect(() => {
        const localTodo = JSON.parse(localStorage.getItem('todo'))
        if(localTodo) {
            setMytodo(localTodo)
        }
    },[])

    useEffect(() => {
        localStorage.setItem('todo', JSON.stringify(mytodo));
    },[mytodo])

  return (
    <div className='flex items-center justify-center flex-col mt-8'>
        <h2 className='uppercase text-4xl font-bold first-letter:text-cyan-600 mb-8'>My Todos</h2>
        <form onSubmit={handleSubmit} className="w-2/4">
            <div className='bg-gray-200'>
                <input name="search" placeholder='search' className='bg-transparent p-2' value={search} onChange={searchChange}></input>
            </div>
            <div className='flex items-center justify-between bg-gray-200  mt-2 mb-8'>
                <input name="todo" placeholder='eg:your todos' className='bg-transparent  p-2' value={todo} onChange={todoChange}></input>
                <button onClick={handleSubmit} type="submit" className='bg-cyan-600 w-max py-2 px-4 uppercase font-bold cursor-pointer hover:bg-cyan-800 hover:text-gray-300'>add</button>
            </div>
        </form>

        {/* This is actual todo */}
        
        {
             mytodo.map(todoo => {
                const {id, todo} = todoo;
                return (
                    <div className='mt-2 w-3/4' key={id}>
                        <div className='flex justify-between bg-gray-300 p-4 rounded drop-shadow-md'>
                            <p className='mr-4 break-words capitalize'>{todo}</p>
                            <div className='flex gap-4'>
                                <button onClick={() => editTodo(id)} className='text-xl hover:text-teal-700 transition-color'>
                                    <AiFillEdit />
                                </button>
                                <button onClick={() => deleteTodo(id)} className='text-2xl hover:text-red-700 transition-color'>
                                    <AiFillDelete />
                                </button>
                            </div>
                        </div>
                </div>
                )
            }) 
        }
    </div>
  )
}

export default SingleTodo