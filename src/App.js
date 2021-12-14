import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import './App.css'
// eslint-disable-next-line
import { useState , useEffect , useReducer} from "react";
import DataContext from "./data/DataContext";
import ReportComponent from "./components/ReportComponent";
import { BrowserRouter as Router , Switch,Route,Link } from "react-router-dom";


function App() {
  const design = {color:"red",textAlign:"center",fontSize:'1.5rem'}
  
  const initState = [
    {id:1,title:"ค่าเช่าบ้าน",amount:-20000},
    {id:2,title:"เงินเดือน",amount:12000},
    {id:3,title:"ค่าเดินทาง",amount:-500},
    {id:4,title:"ขายของ",amount:20000},
  ]
  
  const [items,setItems] = useState(initState)  //สร้าง State เพื่อนำข้อมูลทีึ่ส่งจาก FormComponent มาใช้งาน
  const [reportIncome,setReportIncome] = useState(0)
  const [reportExpense,setReportExpense] = useState(0)
  
  const onAddNewItem = (newItem)=>{
      setItems((prevItem)=>{
        return [newItem,...prevItem] //loop prevItem เอาข้อมูลเดิมที่มีอยู่แล้วมาต่อจาก newItem
      })
  }

  useEffect(()=>{
    const amounts = items.map(items=>items.amount)
    //console.log(amounts)
    const income = amounts.filter(element=>element>0).reduce((total,element)=>total+=element,0)
    const expense = (amounts.filter(element=>element<0).reduce((total,element)=>total+=element,0))*-1

    setReportIncome(income.toFixed(2))
    setReportExpense(expense.toFixed(2))

  },[items,reportIncome,reportExpense])

  //reducer state
  // const [showReport,setshowReport] = useState(false)
  // const reducer = (state,action)=>{
  //   switch(action.type){
  //     case "SHOW" :
  //       return setshowReport(true)
  //     case "HIDE" :
  //       return setshowReport(false)
  //    }
  // }

  // const [result,dispatch] = useReducer(reducer,showReport)
  return (
      <DataContext.Provider value={{income : reportIncome,expense: reportExpense}}>
        <div className="container">
            <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
            {/* {showReport && <ReportComponent/>} */}
            <Router>
              <div>
                <ul className="horizontal-menu">
                  <li>
                    <Link to="/">ข้อมูลบัญชี</Link>
                  </li>
                  <li>
                    <Link to="/insert">บันทึกข้อมูล</Link>
                  </li>
                </ul>

                <Switch>
                  <Route path="/" exact>
                    <ReportComponent/>
                  </Route>
                  <Route path="/insert">
                    <FormComponent onAddItem={onAddNewItem}/>
                    <Transaction items = {items}/> {/* props ไปที่ Transaction */}
                  </Route>
                </Switch>

              </div>
            </Router>


            {/* <h1>{result}</h1>
            <button onClick={()=>dispatch({type:"SHOW"})}>แสดง</button>
            <button onClick={()=>dispatch({type:"HIDE"})}>ซ่อน</button> */}
        </div>
      </DataContext.Provider>
  );
}

export default App;
