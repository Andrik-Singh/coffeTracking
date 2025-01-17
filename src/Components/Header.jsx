import { useAuth } from "../context/AuthContext"

const Header = ({ setShowModal }) => {
  const { globalUser ,logout} = useAuth()
  return (
    <header className="bg-red-400 p-10 flex justify-between ">
      <div>
        <h1 className="text-gradient-brown text-4xl mb-3">
          Coffe Tracker
        </h1>
        <p className="text-gradient-brown text-2xl ">Track your coffes</p>
      </div>
      {globalUser ? <button className="cursor-pointer uppercase rounded-md bg-white px-4 py-2  active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition" onClick={()=>{
        logout()
        
      }}>
        SignOut
      </button> 
      :
        <button className="cursor-pointer uppercase rounded-md bg-white px-4 py-2 active:translate-x-0.5 active:translate-y-0.5 hover:shadow-[0.5rem_0.5rem_#F44336,-0.5rem_-0.5rem_#00BCD4] transition" onClick={() => {
          setShowModal(true)
        }}>
          Sign In
        </button>}

    </header>
  )
}

export default Header