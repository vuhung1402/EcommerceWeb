// icons/image
import Logo from "../img/logo.png"
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md"
import Avatar from "../img/avatar.png"

//hooks
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

//firebase
import { app } from "../firebase"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useStateValue } from "../context/StateProvider"
import { actionType } from "../context/reducer"
import { useState } from "react"


function Header() {
    const firebaseAuth = getAuth(app)
    const provider = new GoogleAuthProvider()

    const [{user}, dispatch] = useStateValue()

    const [isMenu, setIsMenu] = useState(false)

    const login = async () => {
        if(!user){
            const { user: {refreshToken, providerData}} = await signInWithPopup(firebaseAuth, provider)
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0]
            })
            localStorage.setItem('user', JSON.stringify(providerData[0]))
        }else{
            setIsMenu(!isMenu)
        }
    }

    const logout = () => {
        setIsMenu(!isMenu)
        localStorage.clear()

        dispatch({
            type: actionType.SET_USER,
            user: null 
        })
    }

    return(
        <header className="fixed z-50 w-screen bg-slate-200 p-3 px-4 md:p-6 md:px-16">
            {/* desktop and tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between">
                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} alt="logo" className="w-8 object-cover" />
                    <p className="text-headingColor text-xl font-bold">City</p>
                </Link>
                
                <div className="flex items-center gap-8">
                    <ul className="flex items-center gap-8">
                        <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Home</li>
                        <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Menu</li>
                        <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">About Us</li>
                        <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Service</li>
                    </ul>

                    <div className="relative flex items-center justify-center">
                        <MdShoppingBasket className=" text-textColor text-2xl cursor-pointer"/>
                        <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-sm text-white font-semibold">2</p>
                        </div>
                    </div>

                    <div className="relative">
                        <motion.img 
                            whileTap={{scale: 0.6}} 
                            src={user ? user.photoURL : Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer select-none rounded-full" 
                            alt="user profile"
                            onClick={login}/>

                        {
                            isMenu && (
                                <div className="w-40 bg-primary rounded-lg flex flex-col absolute top-12 right-0">
                                    {
                                        user && user.email === "badao867@gmail.com" && (
                                            <Link to={"/createItem"}>
                                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">New item <MdAdd/> </p>
                                            </Link>
                                        )
                                    }
                                    <p 
                                        className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                        onClick={logout}
                                    >
                                        Log out <MdLogout/> 
                                    </p>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className="flex items-center justify-between md:hidden w-full h-full">
                <div className="relative flex items-center justify-center">
                        <MdShoppingBasket className=" text-textColor text-2xl cursor-pointer"/>
                        <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                            <p className="text-sm text-white font-semibold">2</p>
                        </div>
                </div>

                <Link to={"/"} className="flex items-center gap-2">
                    <img src={Logo} alt="logo" className="w-8 object-cover" />
                    <p className="text-headingColor text-xl font-bold">City</p>
                </Link>

                <div className="relative">
                    <motion.img 
                        whileTap={{scale: 0.6}} 
                        src={user ? user.photoURL : Avatar} className="w-10 min-w-[40px] h-10 min-h-[40px] cursor-pointer select-none rounded-full" 
                        alt="user profile"
                        onClick={login}/>

                        {
                            isMenu && (
                                <div className="w-40 bg-primary rounded-lg flex flex-col absolute top-12 right-0">
                                    {
                                        user && user.email === "badao867@gmail.com" && (
                                            <Link to={"/createItem"}>
                                                <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">New item <MdAdd/> </p>
                                            </Link>
                                        )
                                    }
                                    <ul className="flex flex-col px-4 py-2 gap-4">
                                        <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Home</li>
                                        <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Menu</li>
                                        <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">About Us</li>
                                        <li className=" text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">Service</li>
                                    </ul>
                                    <p 
                                        className="m-2 p-2 rounded flex items-center gap-3 cursor-pointer bg-slate-400 hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                                        onClick={logout}
                                    >
                                        Log out <MdLogout/> 
                                    </p>
                                </div>
                            )
                        }
                    </div>
            </div>
        </header>
    )
}

export default Header