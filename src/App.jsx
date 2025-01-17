import Layout from './Components/Layout'
import Hero from './Components/Hero'
import CoffeForm from './Components/CoffeForm'
import Stats from './Components/Stats'
import History from './Components/History'
import Modal from './Components/Modal'
import Authentication from './Components/Authentication'
import { useState } from 'react'
import { useAuth } from './context/AuthContext' 
export default function App() {
  const {globalData,loading,globalUser} =useAuth()
  const [showModal,setShowModal]=useState(false)
  const isAuthenticated = globalUser

 
  return (
    <Layout setShowModal={setShowModal} >
      <Hero></Hero>
      <CoffeForm isAuthenticated={isAuthenticated} setShowModal={setShowModal}></CoffeForm>
      {loading && isAuthenticated &&(
        <p>loading</p>
      )}
      {isAuthenticated && (
        <>
        <Stats></Stats>
        <History/>
        </>
      )}
      {showModal && <Modal setShowModal={setShowModal}>
          <Authentication setShowModal={setShowModal} ></Authentication>
        </Modal>}
    </Layout>
  )
}