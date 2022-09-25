import React from "react";
import { buyProduct } from "../../pages/shoppingList.slice";
import { useAppDispath } from "../../redux/hook/hook";
import './buttonBuy.scss'

const ButtonBuy: React.FC = () => {
  const dispath = useAppDispath()

  function handleBuy(){
    dispath(buyProduct())
  }

  return(
    <button className="button__buy" onClick={handleBuy}>Купить</button>
  )
} 

export default ButtonBuy