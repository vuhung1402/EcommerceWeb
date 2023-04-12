import { doc, setDoc } from "firebase/firestore"
import { firestore } from "../firebase"

export const saveItem = async (data) => {
    await setDoc(doc(firestore, "foodItemss", `${Date.now()}`),data, {merge:true})
}