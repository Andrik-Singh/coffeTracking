import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { calculateCurrentCaffeineLevel, checkTime, getCaffeineAmount, timeSinceConsumption } from "../utils";
const Button = ({title ,time,setCoffeHistory,coffeHistory}) => {
  return (
    <button onClick={()=>{
      let newCoffeList=coffeHistory.filter((utc)=>{
        console.log(checkTime((utc))); 
        console.log(time);
        if(checkTime(utc)<time){
          return true
        }
        else{
          return false
        }
      })
      setCoffeHistory(newCoffeList)
      
    }} className="w-[150px] bg-black h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">
      {title}
    </button>
  );
}
const History = () => {
  const { globalData } = useAuth()
  if(!globalData){
    return 
  }
  const sortedData = Object.keys(globalData ).sort((a, b) => b - a)
  const [coffeHistory, setCoffeHistory] = useState(sortedData || [])
  return (

    <div className="m-10">
      <div className="flex  sm:flex-row flex-wrap gap-10 justify-between items-center">
        <h1>
          <i className="fa-solid fa-history mr-3"></i>
          History
        </h1>
        <Button coffeHistory={sortedData} setCoffeHistory={setCoffeHistory} time={12} title={"12 hours ago"}></Button>
        <Button coffeHistory={sortedData} setCoffeHistory={setCoffeHistory} time={24} title={"1day ago"}></Button>
        <Button coffeHistory={sortedData} setCoffeHistory={setCoffeHistory} time={24*7} title={"1 week  ago"}></Button>
        <Button coffeHistory={sortedData} setCoffeHistory={setCoffeHistory} time={24*7*2} title={"2 week ago"}></Button>
        <Button coffeHistory={sortedData} setCoffeHistory={setCoffeHistory} time={24*7*100} title={"All time"}></Button>
      </div>
      <div className="flex gap-10 flex-wrap mt-3">
      {coffeHistory.map((time,index)=>{
        const coffe=globalData[time];
        const cost=coffe?.cost
        const name =coffe?.name
        const timeSinceConsume=timeSinceConsumption(time)
        const originalAmount=getCaffeineAmount(name)
        const remainingAmount=calculateCurrentCaffeineLevel({[time]:coffe})
        const summary=`Name:${name} Cost:${cost}$ `       
        
        return(
          <div key={index}>
            <i className="fa-solid fa-mug-hot text-4xl"></i>
            <h4>{summary}</h4>
            <h4>{timeSinceConsume}</h4>
            <h4>{remainingAmount}mg/{originalAmount}mg</h4>
          </div>
        )
      })}
      </div>
    </div>
  )
}

export default History