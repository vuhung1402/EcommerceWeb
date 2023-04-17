import './App.css';

//component
import { Header, MainContainer, CreateContainer } from "./components"

//hooks
import { Route, Routes } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { useStateValue } from './context/StateProvider';
import { getAllFoodItems } from './components/firebaseFunction';
import { useEffect } from 'react';
import { actionType } from './context/reducer';

function App() {
  const[ {}, dispatch ] = useStateValue()

  const fetchData = async() => {
    await getAllFoodItems().then(data => {
      dispatch({
        type : actionType.SET_FOOD_ITEMS,
        foodItems: data
      })
    })
  }
  useEffect(() => 
    {
       fetchData()
    },[])
  return (
    <AnimatePresence>
        <div className="w-screen h-auto flex flex-col">
          <Header/>
          
          <main className='mt-14 md:mt-20 px-4 md:px-16 py-4 w-full bg-slate-200'>
            <Routes>
                <Route path='/*' element={<MainContainer />} />
                <Route path='/createItem' element={<CreateContainer />} />
            </Routes>
          </main>
        </div>
    </AnimatePresence>
  );
}

export default App;
