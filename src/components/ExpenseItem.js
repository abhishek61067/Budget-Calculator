import React from 'react'
import { MdEdit, MdDelete } from "react-icons/md";

const ExpenseItem = ({ expense, handleEdit, handleDelete }) => {
    const { id, charge, amount } = expense;
    return (

        <li className='item'>
            <div className='info'>
                <span className='expense'>
                    {charge}
                </span>
                <span className='amount'>
                    ${amount}
                </span>

            </div>
            <div>
                {/* aria lable helps the browser to know what that icon is since we dont have any 
                text in icons */}
                <button className='edit-btn' aria-label='edit button' onClick={()=>handleEdit(id)}><MdEdit /></button>
                <button className='clear-btn' aria-label='delete button' onClick={()=>handleDelete(id)}><MdDelete /></button>
            </div>
        </li>

    );
};

export default ExpenseItem