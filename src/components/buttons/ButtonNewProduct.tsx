import React from "react";
import './buttonNew.scss'

interface ButtonProps{
  onOpen: () => void
}

const ButtonNewProduct: React.FC<ButtonProps> = ({ onOpen }) => {
  return(
    <button className="button__create" onClick={onOpen}>Добавить товар</button>
  )
}

export default ButtonNewProduct