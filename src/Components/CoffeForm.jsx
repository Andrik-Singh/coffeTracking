import { doc, setDoc } from "firebase/firestore"
import { useAuth } from "../context/AuthContext"
import { coffeeOptions } from "../utils"
import Button from "./Buttons"
import Input from "./Input"
import InputTime from "./InputTime"
import { useState } from "react"
import { db } from "../firebase"

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
const mins = [0, 5, 10, 15, 25, 30, 45]
const CoffeForm = ({ isAuthenticated, setShowModal }) => {
  const [coffeList, setcoffeList] = useState(coffeeOptions)
  const [coffeName, setcoffeName] = useState(null)
  const [coffeCost, setCoffeCost] = useState(null)
  const [lastHours, setLastHours] = useState(null)
  const [lastMinute, setLastMinute] = useState(null)
  const { globalData, globalUser, setglobalData,loginWithGoogle } = useAuth()
  async function handleFormSubmit() {
    if (!isAuthenticated) {
      setShowModal(true)
      return
    }
    if (!coffeName || !coffeCost) {
      return
    }
    const newGlobalData = {
      ...(globalData || {})
    }
    const nowTime = Date.now()
    const timeToSubtract = lastHours * 60 * 60 * 1000 + lastMinute * 60 * 1000
    const timeStamp = nowTime - timeToSubtract
    newGlobalData[timeStamp] = {
      "name": coffeName,
      "cost": coffeCost
    }
    setglobalData(newGlobalData)
    const useRef = doc(db, 'users', globalUser.uid)
    const res = await setDoc(useRef, {
      [timeStamp]: {
        "name": coffeName,
        "cost": coffeCost
      }
    },
      { merge: true })
    setCoffeCost(null)
    setcoffeName(null)
  }

  function addEntry() {
    return (
      <button onClick={handleFormSubmit}
        className="relative  bg-white isolation-auto z-10  before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full hover:text-white before:-right-full before:hover:right-0 before:rounded-full before:bg-[#A12347] before:-z-10 before:aspect-square before:hover:scale-150 overflow-hidden before:hover:duration-700 inline-flex items-center justify-center px-4 py-3 text-sm font-semibold text-black border border-gray-200 rounded-lg shadow-sm gap-x-2 hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
        Add Entry
      </button>
    )
  }

  function ChangeCoffeList(input) {
    const newList = coffeeOptions.filter((coffe) => {
      const coffeName=coffe?.name.toLowerCase()
      if (coffeName.includes(input.toLowerCase())) {
        return true
      }
    })
    setcoffeList(newList)
  }


  return (
    <div className="p-10 flex flex-col gap-10" id="coffeForm">
      <section>
        <h1 className="mb-3 text-3xl text-gradient-brown" >
          {coffeName === null ? 'Pick a coffe' : `You picked ${coffeName}`}
        </h1>
        <Input ChangeCoffeList={ChangeCoffeList} />
      </section>
      <section className="flex flex-wrap gap-10">
        {coffeList.slice(0, 6).map((coffe, coffeIndex) => (
          <Button setcoffeName={setcoffeName} key={coffeIndex} coffeObj={coffe} />
        ))}
      </section>

      <section className="flex gap-10 flex-wrap w-full">
        <div >
          <h1>Enter the price</h1>
          <div className="relative rounded-lg w-64 overflow-hidden before:absolute before:w-12 before:h-12 before:content[''] before:right-0 before:bg-violet-500 before:rounded-full before:blur-lg after:absolute after:-z-10 after:w-20 after:h-20 after:content[''] after:bg-rose-300 after:right-12 after:top-3 after:rounded-full after:blur-lg">
            <input placeholder="4.50$" onChange={(e) => {
              if(e.target.value<0){
                e.target.value=0
              }
              setCoffeCost(e.target.value)
            }} className="relative bg-transparent ring-0 outline-none border border-neutral-500 text-neutral-900 placeholder-violet-700 text-sm rounded-lg focus:ring-violet-500 placeholder-opacity-60 focus:border-violet-500 block w-full p-2.5 checked:bg-emerald-500" type="number" min={0} />
          </div>
        </div>

        <div>
          <h1>Enter the remaining Hours</h1>
          <InputTime arrays={hours} setLastTime={setLastHours}></InputTime>
        </div>
        <div>
          <h1>Enter The remaining minutes</h1>
          <InputTime arrays={mins} setLastTime={setLastMinute}></InputTime>
        </div>

      </section>
      <section>

        {addEntry()}
      </section>
    </div>
  )
}

export default CoffeForm