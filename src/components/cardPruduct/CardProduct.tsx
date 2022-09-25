import React, { HTMLAttributes } from "react";
import { IProduct } from "../../models";
import { deletProduct, viewNotification } from "../../pages/shoppingList.slice";
import { useAppDispath } from "../../redux/hook/hook";
import './cardProduct.scss'

interface CardProductProps{
  product: IProduct
}

const CardProduct: React.FC<CardProductProps> = ({ product }) => {
  const dispatch = useAppDispath()

  function deleteCard(e: React.MouseEvent){
    const target = e.target as HTMLAttributes<string>
    const id = target.id 
    
    dispatch(deletProduct(id))
  }

  return(
    <div className="card__container">
      <div className="card__header">
        <p className="card__title">
         {product.title}</p>
        <span id={`${product.id}`} className="card__delete" data-title="Удалить товар" title="Удалить товар" onClick={deleteCard}></span>
      </div>
      <div className="card__body">
        <div className="card__img">
          <img className="img" 
              src={product.image} alt="..." />
        </div>
        <p className="card__description">
          <strong>Описание: </strong>{product.description}</p>
        <p className="card__price">
          <strong>Цена: </strong> {product.price}</p>
      </div>
    </div>
  )
}

export default CardProduct