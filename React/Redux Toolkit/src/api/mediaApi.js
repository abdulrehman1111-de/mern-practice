import axios from "axios";

const GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY

export async function fetchGIFs(query, page=1, per_page=20){

    const res = await axios.get("https://api.giphy.com/v1/gifs/search", {
        params: {
            api_key: GIPHY_KEY,
            q: query,
            limit: per_page,
            offset: (page - 1) * per_page
        }
    })
    
    return res.data
}






