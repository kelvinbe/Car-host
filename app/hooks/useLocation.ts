import { getAuth } from "firebase/auth"
import { app } from "../firebase/firebaseApp"
import { MARKETS_API, SUBMARKETS_API } from "./constants"
import axios from "axios"
import { useState } from "react"

type dataState = {
    error: any | null,
    loading: boolean,
    data: any[]
}

const useLocation = () => {
    const [markets, setMarkets] = useState<dataState>({
        error: null,
        loading: false,
        data: []
    })

    const [submarkets, setSubmarkets] = useState<dataState>({
        error: null,
        loading: false,
        data: []
    })

    /**
     * @name fetchMarkets
     * @description - fetches all markets
     * @returns {Promise<Market[]>}
     */

    const fetchMarkets = async () => {
        setMarkets((prev)=>({
            ...prev,
            loading: true
        }))
        try {
            const idToken = await getAuth(app).currentUser?.getIdToken()
            const response = await axios.get(MARKETS_API, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "x-user": "HOST"
                }
            })
            setMarkets((prev)=>({
                ...prev,
                loading: false,
                data: response.data.data
            }))

        } catch (e) {
            setMarkets((prev)=>({
                ...prev,
                loading: false,
            }))
        }
    }

    /** 
     * @name fetchSubmarkets
     * @description - fetches all submarkets within a market
    */

    const fetchSubmarkets = async (market_id: string) => {

        try {
            const idToken = await getAuth(app).currentUser?.getIdToken()
            const response = await axios.get(`${SUBMARKETS_API}?market_id=${market_id}`, {
                headers: {
                    "Authorization": `Bearer ${idToken}`,
                    "x-user": "HOST"
                }
            })
            setSubmarkets((prev)=>({
                ...prev,
                loading: false,
                data: response.data.data
            }))
        } catch (e) {
            setSubmarkets((prev)=>({
                ...prev,
                loading: false
            }))
        }

    }

    return {
        markets,
        submarkets,
        fetchMarkets,
        fetchSubmarkets
    }
}

export default useLocation  