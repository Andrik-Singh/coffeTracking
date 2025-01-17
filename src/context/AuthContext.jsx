import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"
import { createContext } from "react"
import { useState, useEffect, useContext } from "react"
import { auth, db, provider } from "../firebase"
import { doc, getDoc } from "firebase/firestore"
const AuthContext = createContext()
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [globalUser, setglobalUser] = useState(null)
    const [globalData, setglobalData] = useState(null)
    const [loading, setloading] = useState(false)
    function signUp(email, password) {
        createUserWithEmailAndPassword(auth, email, password)
    }
    function login(email, password) {
        signInWithEmailAndPassword(auth, email, password)
    }
    function logout() {
        setglobalUser(null)
        setglobalData(null)
        return signOut(auth)
    }
    function resetPassword(email) {
        console.log("wroking");
        sendPasswordResetEmail(auth, email)
    }
    async function loginWithGoogle() {
        return signInWithPopup(auth, provider).then(result => {
            console.log(result.user);
        })
        .catch(error=>{
            console.log(error.message);
            
        })

    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {

                return
            }
            setglobalUser(user)

            try {
                setloading(true)
                console.log(user);

                const docref = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docref)
                let firebaseData = {}
                if (docSnap.exists) {
                    console.log("User found");
                    firebaseData = docSnap.data()
                }
                setglobalData(firebaseData)
            }
            catch (err) {
                console.log(err.message);
            }
            finally {
                setloading(false)
            }
        })
        return unsubscribe
    }, [])
    const value = { globalUser, setglobalUser, globalData, setglobalData, loading, signUp, logout, login, resetPassword, loginWithGoogle }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
