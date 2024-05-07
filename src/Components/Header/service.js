import axios from "axios"
import { baseUrl, modifyResult } from "../../lib/helper"

export const locationList = async () => {
    try {
        const { data } = await axios.get(`${baseUrl}/locations?populate=icon`)
        return modifyResult(data?.data)
    } catch (error) {
        console.log(error.response)
    }
}