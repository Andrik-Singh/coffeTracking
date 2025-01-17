import Footer from "./Footer"
import Header from "./Header"
const Layout = ({children ,setShowModal}) => {

    
  return (
    <>
        <Header setShowModal={setShowModal} ></Header>
        <main className="w-[100vw]">
            {children}
        </main>
        <Footer/>
    </>
  )
}

export default Layout