import { collection, doc, getDocs, orderBy, query, setDoc } from "firebase/firestore"
import { firestore } from "../firebase"

export const saveItem = async (data) => {
    await setDoc(doc(firestore, "foodItemss", `${Date.now()}`),data, {merge:true})
}

export const getAllFoodItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "foodItemss"), orderBy("id", "desc"))
    )
    return items.docs.map((doc) => doc.data())
}