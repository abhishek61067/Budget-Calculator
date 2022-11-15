import logo from './logo.svg';
import './App.css';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import { v4 as uuid } from "uuid"
import { useState, useEffect } from "react"
import ExpenseItem from './components/ExpenseItem';


//useEffect key points
//runs after each render
//first parameter - callback function(runs after render)
//second parameter - array for letting react know when to render
//react rerenders when state or props has changed 
//if the second parameter is absent, useEffect is gonna invoked every time state
//  are changed.
//if the second parameter is empty array, useEffect is going to be invoked just one
//  time the page loads.
//if the second parameter is some state, useEffect is going to be invoked the moment 
// that particular state is changed.

// const initialExpenses = [
//   { id: uuid(), charge: "rent", amount: 20 },
//   { id: uuid(), charge: "food", amount: 10 },
// ]
const initialExpenses = localStorage.getItem("expenses")?JSON.parse(localStorage.getItem("expenses")):[];


function App() {
//useEffect
//we can put useEffect anywhere inside App() except inside return
//We just want to rerender the page when the expenses state is changed, so that after
//  we add in expenses, it is going to rerender the page and we get the value from
  // localStorage in our updated expenses state.
useEffect(()=>{
  // console.log("we called useEffect");
  localStorage.setItem("expenses",JSON.stringify(expenses));
}, [expenses]);


  //****state values***
  //all expenses, add Expenses
  const [expenses, setExpenses] = useState(initialExpenses);
  // single expense
  const [charge, setCharge] = useState("");
  // single expense
  const [amount, setAmount] = useState(0);
  // console.log(typeof(amount));
  //Alert
  const[alert, setAlert] = useState({show:false});
// edit
const [edit,setEdit] = useState(false);
// edit items
const [id,setId] = useState(0);
// temp var for edit
const[temp, setTemp] =useState({});







  // **state functionality**
  //handle charge
  const handleCharge = (e) => { setCharge(e.target.value) };
  //handle amount
  const handleAmount = (e) => { setAmount(parseInt(e.target.value)) };
  //Even if the amount is passed from the from as a number, it is passed as a string. Thats why 
  // we parsed.

  // handle alert
  //object is the parameter here
  const handleAlert = ({type,text}) =>{
setAlert({show:true, type,text});
setTimeout(()=>{setAlert({show:false});},2000); //this mean i am going to call that function(setAlert({show:false})) after 3 seconds
  }


  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if(charge!=="" && amount>0){
//to make a different functionality of edit from submit
      if(edit){
// this is for edit only
const tempExpense  = expenses.map((item)=>{
  return item.id ===id?{...item,charge,amount}:item
})
setExpenses(tempExpense);
setEdit(false);
setId(0);
setCharge("");
setAmount(0);
// window.alert("edit");
handleAlert({ type:"success", text:"Updated Successfully!"});


      }
      else{
        //this is for submit only
        const singleExpense = {id:uuid(),charge,amount}; //Since charge is same for property
      //  and value, we can just do charge instead of charge:charge
      setExpenses([...expenses,singleExpense]);
            handleAlert({ type:"success", text:"Added Successfully!"});

      }
      // this is for both submit and edit
      

      setAmount(0);
      setCharge("");

    }
    else{

      if(charge===""&&amount===0){
  handleAlert({ type:"danger", text:"charge and amount cant be empty!"});

      }
      else if(charge===""){
  handleAlert({ type:"danger", text:"charge cant be empty!"});
      }
      
    
      else{
        handleAlert({ type:"danger", text:"amount cant be empty!"})
      }
    }

  };

  //handle clear expenses
  const handleClearExpenses =()=>{
    setExpenses([]);
    handleAlert({type:"danger", text: "All items"});
  }

  //handle detele
  const handleDelete = (id)=>{
    console.log(`item deleted with id:${id}`)
    // window.alert("del");
// expenses.filter((val)=>{return val.id!==id});
const filteredList = expenses.filter((val)=>{return val.id!==id});
setExpenses(filteredList);
handleAlert({type:"danger", text:"Item deleted!"});
  }

  //handle edit
  const handleEdit = (id)=>{
    // console.log(`item edited with id:${id}`);
    //find and filter has the same logic
    const expense = expenses.find((item)=>item.id===id);
    //You can give any name for variable instead of charge or amount
   let {charge,amount} = expense;
   setCharge(charge);
   setAmount(amount);
   setEdit(true);
   setId(id);

    
  }



  return (
    // there has to be some root element before the components.Either use div 
    // or other html element or fragment.
    <>
      {/*rendering components */}
      {alert.show && <Alert type={alert.type} text ={alert.text}/>}
            {/* <Alert></Alert> same to <Alert/>*/}

      <h1>Budget Calculator</h1>
      <main className='App'>
        < ExpenseForm
         charge={charge}
          amount={amount} 
          handleCharge={handleCharge}
          handleAmount={handleAmount}
           handleSubmit={handleSubmit}
           edit={edit} ></ExpenseForm >
        {/* using prop expenses ={expenses} */}
        <ExpenseList expenses={expenses} handleClearExpenses={handleClearExpenses}
         handleEdit={handleEdit} handleDelete={handleDelete}> </ExpenseList>
      </main>
      <h1>Total Spending: {" "}
        <span className='total'>
          ${" "}
          {expenses.reduce((total, val) => {
            return total += val.amount;
          }, 0)}
        </span>
      </h1>

    </>
  );
}

export default App;
