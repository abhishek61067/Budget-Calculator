import React from 'react'
import Item from "./ExpenseItem"
import { MdDelete } from "react-icons/md"
const ExpenseList = ({ expenses, handleClearExpenses, handleEdit, handleDelete }) => {
    return (
        <>
            <ul className='list'>
                {expenses.map((expense) => {
                    return <Item key={expense.id} expense={expense}  handleEdit ={handleEdit} handleDelete={handleDelete} />
                })}
            </ul>
            {expenses.length > 0 && <button className='btn' onClick={handleClearExpenses}>
                Clear Expenses
                <MdDelete className='btn-icon' />
            </button>}

        </>
    )
}

export default ExpenseList