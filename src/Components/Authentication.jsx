import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Authentication = ({ setShowModal }) => {
  const [register, setregister] = useState(false)
  const [email, setemail] = useState(' ')
  const [password, setpassword] = useState('')
  const [error, seterror] = useState(false)
  const [Authenticating, setAuthenticating] = useState(false)
  const { signUp, login, resetPassword } = useAuth()
  function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  return (
    <>
      <div className="w-[400px] bg-white text-start md:p-10 p-4 flex flex-col gap-4 rounded-lg">
      <i onClick={() => {
        setShowModal(false)
      }} className="fa-regular fa-circle-xmark absolute md:left-[60vw] left-[80vw] text-2xl"></i>
        <h1>{register ? 'Create a account' : 'Welcome Back'}</h1>
        <h1>{register ? 'Sign up' : ' Login'}</h1>
        {error != null ?
          <p>
            {error}
          </p>
          :""
        }
        <input
          onChange={(e) => {
            setemail(e.target.value)
          }}
          className={` ${error ? "border-red-800 border-5 bg-[#e4372e]" : ""}
            bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]`}
          name="text"
          placeholder="Enter email "
          type="text"
        />
        <input onChange={(e) => {
          setpassword(e.target.value)
        }}
          className={` ${error ? "border-red-800 border-5 bg-[#e4372e]" : ""} bg-[#222630] px-4 py-3 outline-none w-[280px] text-white rounded-lg border-2 transition-colors duration-100 border-solid focus:border-[#596A95] border-[#2B3040]`}
          name="text"
          placeholder="Enter password"
          type="password"
        />

        <button
          onClick={async () => {
            if (!validateEmail(email) || password.length < 6) {
              seterror("No email or password found")
              return
            }
            seterror(false)
            try {
              setAuthenticating(true)
              if (register) {
                await signUp(email, password)
              }
              else {
                await login(email, password)
              }
            }
            catch (err) {
              console.log(err.message);
              seterror(err.message)
            }
            finally {
              setAuthenticating(false)
            }
            setShowModal(false)
            console.log(`Email:${email} \n Password:${password}`);
          }}
          className="relative w-32 py-2 px-8 text-black text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out shadow-md hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
        >
          {Authenticating ? <p>
            Authenticating
          </p> :
            <p>
              {register ? 'Sign up' : 'Sign in'}
            </p>
          }
        </button>
        <h3 onClick={async()=>{
          if(!email){
            seterror("No email found")

          }
            try{
              await resetPassword(email)
            }
            catch(err){
              console.log(err.message);
              
            }
        }}>Forgot password?</h3>
        <hr />
        <p className="text-xl">{register ? 'Already got a account' : "Don't have an account"}</p>
        <Button setShowModal={setShowModal}></Button>
        <button id="change"
          onClick={() => {
            setregister(!register)
          }}
          className=" bg-black w-20 h-[50px] my-3 flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#009b49] before:to-[rgb(105,184,141)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]">

          {register ? ' Sign in' : " Sign up"}
        </button>


      </div>
    </>
  )
}
const Button = ({setShowModal}) => {
  const {loginWithGoogle}=useAuth()
  
  return (
    <button
    onClick={
      loginWithGoogle
    }
    className="cursor-pointer text-black flex gap-2 items-center bg-white px-4 py-2 rounded-lg font-medium text-sm hover:bg-zinc-300 transition-all ease-in duration-200">
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" className="w-6">
        <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107" />
        <path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00" />
        <path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50" />
        <path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2" />
      </svg>
      Continue with Google
    </button>
  );
}

export default Authentication