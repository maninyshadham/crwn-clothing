import { useContext,Fragment } from "react"
import { CategoriesContext } from "../../contexts/categories.context"
import CategroyPreview from "../../components/category-preview/category-preview.component";

const CategoriesPreview = () => {
    
    const {categoriesMap} = useContext(CategoriesContext); 
    return (
        <Fragment>
            {
                Object.keys(categoriesMap).map((title) => {
                    const products = categoriesMap[title];
                   return <CategroyPreview key={title} products={products} title={title} />    
                })
            }
            <div className="products-container">
                {/* {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))} */}
            </div>
        </Fragment>
    )
}

export default CategoriesPreview