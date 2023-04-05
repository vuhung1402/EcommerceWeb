import React from 'react'
import Delivery from "../img/delivery.png"
import HeroBg from "../img/heroBg.png"

const HomeContainer = () => {
    return (
        <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-2'>
            <div className='py-2 flex-1 flex flex-col items-start justify-center'>
                <div className='flex items-center gap-2 justify-center px-4 py-1 bg-orange-200 rounded-full'>
                    <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
                    <div className='w-6 h-6 bg-white rounded-full overflow-hidden drop-shadow-xl'>
                        <img src={Delivery} className='h-full w-full object-contain' />
                    </div>
                </div>
    
                <p className='text-[2rem] font-bold tracking-wide'>
                    The Fastest Delivery in <span className=' text-orange-600'>Your City</span>
                </p>
    
                <button type='button' className=' mt-[10px] bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-100' >
                  Order now
                </button>
            </div>
            <div className='py-2 flex-1 items-center hidden md:flex'>
                <img src={HeroBg} className=' ml-auto w-[100px] h-[100px]'/>
                <div className=' w-full h-full absolute flex items-center justify-center'>

                </div>
            </div>
        </div>
      )
}

export default HomeContainer