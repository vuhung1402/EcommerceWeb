import { fetchUser } from "../fetchLocalStorageData"

const userInfo = fetchUser()

export const initialState = {
    user: userInfo,
}