import React, { useEffect } from "react";
import { loadProductList } from "../../pages/shoppingList.slice";
import { useAppDispath, useAppSelector } from "../../redux/hook/hook";
import CardProduct from "../cardPruduct/CardProduct";
import './productList.scss'


const ProductList: React.FC = () => {
  const { productList } = useAppSelector( state => state.shoppingList)
  const dispatch = useAppDispath()

  useEffect(()=>{
    dispatch(loadProductList())
  },[])

  return (
    <div className="productList__container">
      {productList.length > 0? productList.map((product) => {
          return <CardProduct key={product.id}  product={product} />
        }): <h2>В вашем списке нет товаров, добавьте их!</h2>}
    </div>
  )
}

export default ProductList