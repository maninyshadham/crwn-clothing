import { createContext, useState,useEffect } from "react"
import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.jsx";

export const CategoriesContext = createContext({
    categoriesMap : []
});

export const CategoriesProvider = ({children}) => {
    useEffect(() => {
        const getCategoriesMap = async() => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap);
            setCategoriesMap(categoryMap);
        };
        getCategoriesMap();
    },[]);
    const [categoriesMap,setCategoriesMap] = useState({});
    
    return (
        <CategoriesContext.Provider value={{categoriesMap}}>{children}</CategoriesContext.Provider>
    )
}