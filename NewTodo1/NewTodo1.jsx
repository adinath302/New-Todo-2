import { complex } from 'motion/react';
import React, { use, useState } from 'react'
import { FaDove } from 'react-icons/fa';
import { ImCross } from "react-icons/im";
import { MdRestaurantMenu } from 'react-icons/md';


const NewTodo1 = () => {
    const [Input, setInput] = useState('')
    const [Todo, setTodo] = useState([])
    const [filterStatus, setfilterStatus] = useState("All")


    const HandleSubmit = (e) => {
        e.preventDefault();
        if (Input.trim() === '') return;
        const NewTodo = {
            id: Date.now(),
            text: Input,
            complete: false
        }
        setTodo([...Todo, NewTodo]);
        setInput('')
    }

    const HandleMark = (id) => {
        setTodo(
            Todo.filter((item) => item.id === id ? { ...Todo, complete: !item.complete } : item)
        )
    }

    const HandleDelete = (id) => {
        setTodo(
            Todo.filter((item) => item.id !== id)
        )
    }

    const FilterTodo = Todo.filter(Todo => {
        if (filterStatus === "All") return true;
        if (filterStatus === "Active") return !Todo.complete;
        if (filterStatus === "complete") return Todo.complete;
    })

    return (
        <div
            className='m-4'>
            <div
                className='gap-3'>
                <form
                    onSubmit={HandleSubmit} className='m-3'>

                    <input
                        type="input"
                        className='border-2'
                        onChange={(e) =>
                            setInput(e.target.value)} />
                    <button
                        type='submit'
                        className='p-2 border-1 select-none'>Submit
                    </button>

                </form>
                <div className='flex gap-4 my-4'>
                    <div onClick={() => setfilterStatus("All")}>All</div>
                    <div onClick={() => setfilterStatus("Active")}>Active</div>
                    <div onClick={() => setfilterStatus("complete")}>Completed</div>
                </div>
                <div
                    className='flex gap-2 items-center '>
                    <ul
                        className=''>{
                            FilterTodo.map((item) => (
                                <div
                                    key={item.id}
                                    className='flex gap-3'>
                                    <li
                                        onClick={() => HandleMark(item.id)}
                                        className={`text-black select-none ${item.complete ? "line-through" : "none"}`}
                                    >{item.text}
                                    </li>
                                    <div
                                        className='flex items-center'
                                        onClick={() => HandleDelete(item.id)}
                                    > <ImCross /></div>
                                </div>
                            ))
                        }
                    </ul>
                </div>

            </div >
        </div >
    )
}

export default NewTodo1