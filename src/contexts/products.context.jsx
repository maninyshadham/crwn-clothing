import { createContext, useState } from "react"
import productsList from '../shop-data.json';

export const ProductsContext = createContext({
    products : []
});

export const ProductProvider = ({children}) => {
    const [products,setProducts] = useState(productsList);
    
    return (
        <ProductsContext.Provider value={{products}}>{children}</ProductsContext.Provider>
    )
}