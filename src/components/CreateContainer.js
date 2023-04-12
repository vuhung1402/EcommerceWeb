import React, { useState } from 'react'

import {MdFastfood, MdCloudUpload, MdDelete, MdFoodBank, MdAttachMoney} from "react-icons/md"

import {categories} from "../data/data"
import Loader from './Loader'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../firebase'
import { saveItem } from './firebaseFunction'

const CreateContainer = () => {

  const [title, setTitle] = useState("")
  const [calories, setCalories] = useState("")
  const [price, setPrice] = useState("")
  const [category, setCategory] = useState(null)
  const [imageAsset, setImageAsset] = useState(null)
  const [fields, setFields] = useState(false)
  const [alertStatus, setAlertStatus] = useState("danger")
  const [msg, setMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const uploadImage = (e) => {
    setIsLoading(true)
    const imageFile = e.target.files[0]
    const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)

    uploadTask.on("state_changed", (snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    }, (error) => {
      console.log(error)
      setFields(true)
      setMsg("Error while uploading")
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000);
    }, () => {
      getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
        setImageAsset(downloadURL)
        setIsLoading(false)
        setFields(true)
        setMsg("Image Uploaded Successfully")
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false)
        }, 4000)
      })
    })
  }

  const deleteImage = () => {
    setIsLoading(true)
    const deleteRef = ref(storage, imageAsset)
    deleteObject(deleteRef).then(() => {
      setImageAsset(null)
      setIsLoading(false)
      setFields(true)
        setMsg("Image deleted Successfully")
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false)
        }, 4000)
    })
  }

  const saveDetails = () => {
    setIsLoading(true)
    try{
      if(!title || !calories || !imageAsset || !price || !category){
          setFields(true)
          setMsg("Required fields can't be empty")
          setAlertStatus('danger')
          setTimeout(() => {
            setFields(false)
            setIsLoading(false)
        }, 4000);
      }else{
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageUrl: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price
        }
        saveItem(data)
        setIsLoading(false)
        setFields(true)
        setMsg("Data uploaded Successfully")
        clearData()
        setAlertStatus("success")
        setTimeout(() => {
          setFields(false)
        }, 4000)
      }

    } catch(error) {
      console.log(error)
      setFields(true)
      setMsg("Error while uploading")
      setAlertStatus('danger')
      setTimeout(() => {
        setFields(false)
        setIsLoading(false)
      }, 4000);
    }
  }

  const clearData = () => {
    setTitle("")
    setImageAsset(null)
    setCalories("")
    setPrice("")
    setCategory("Select Category")
  }
  
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
        <div className='W-[90%] md:w-[75%] border border-slate-400 rounded-lg p-4 flex flex-col items-center justify-center gap-4'>
            {
              fields && 
              (<p className={`w-full p-2 rounded-lg text-center text-lg font-semibold ${alertStatus === "danger" ? " bg-red-400 text-red-800" : " bg-emerald-400 text-emerald-800"}`}>
                  {msg}
              </p>)
            }

            <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                <MdFastfood className='text-xl text-gray-700'/>
                <input 
                  type='text' required value={title} 
                  placeholder='Give me a title...' 
                  className='w-full h-full text-lg bg-transparent font-semibold outline-none text-textColor'
                  onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <div className='w-full'>
                <select 
                  className=' outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'
                  onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="other" className='bg-white'>
                        Select Category 
                    </option>
                    {categories &&
                      categories.map((item) => (
                          <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor' value={item.urlParamName}>
                            {item.name}
                          </option>
                      )) 
                    }
                </select>
            </div>

            <div className=' group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[225px] md:h-[300px] cursor-pointer rounded-lg'>
                    {isLoading ? <Loader/> : 
                      <>
                        {!imageAsset ? 
                          <>
                            <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
                                <div className='w-full h-full flex flex-col items-center justify-center cursor-pointer gap-2'>
                                    <MdCloudUpload className=' text-gray-500 text-3xl hover:text-gray-700'/>
                                    <p className=' text-gray-500 text-3xl hover:text-gray-700'>Click here to upload</p>
                                </div>
                                <input type='file' name='uploadimage' accept='image/*' onChange={uploadImage} className='w-0 h-0'/>
                            </label>
                          </> : 
                          <>  
                              <div className=' relative h-full'>
                                  <img src={imageAsset} alt='upload image' className='h-full w-full object-cover'/>
                                  <button type='button' onClick={deleteImage} className=' absolute bottom-3 right-3 rounded-full p-3 bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md'>
                                      <MdDelete className='text-white'/>
                                  </button>
                              </div>
                          </> 
                        }
                      </>
                    }
            </div>

            <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                  <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                      <MdFoodBank className='text-gray-700 text-2xl'/>
                      <input value={calories} onChange={(e) => setCalories(e.target.value)} type='text' required placeholder='Calories' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
                  </div>
                  <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
                      <MdAttachMoney className='text-gray-700 text-2xl'/>
                      <input value={price} onChange={(e) => setPrice(e.target.value)} type='text' required placeholder='Price' className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor' />
                  </div>
            </div>

            <div className='flex items-center w-full'>
                  <button type='button' onClick={saveDetails} className='ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold'>
                    Save
                  </button>
            </div>
        </div>
    </div>
  )
}

export default CreateContainer