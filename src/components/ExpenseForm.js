// functional component (rafce)

import React from 'react'
import { MdSend } from "react-icons/md"
//We are getting these props sent from App.js while rendering <ExpenseForm/>
const ExpenseForm = ({
    charge, handleCharge, amount, handleAmount, handleSubmit, edit
}
) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className='form-center'>
                <div className='form-group'>
                    <label htmlFor='charge'>Charge</label>
                    <input
                        type="text"
                        placeholder="eg. rent"
                        className='form-control'
                        id="charge"
                        name='charge' 
                        value={charge}
                        onChange= {handleCharge}/>
                </div>
                <div className='form-group'>
                    <label htmlFor='amount'>Amount</label>
                    <input
                        type="number"
                        placeholder="eg. 1000"
                        className='form-control'
                        id="amount"
                        name='amount' value={amount}
                        onChange= {handleAmount} />
                </div>



            </div>
            <button className='btn' type='submit'>{edit?"edit":"submit"} <MdSend className="btn-icon" /></button>
        </form>
    )
}

export default ExpenseForm