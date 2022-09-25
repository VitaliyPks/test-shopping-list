import React, { useState } from "react";
import { createProduct } from "../../pages/shoppingList.slice";
import { useAppDispath } from "../../redux/hook/hook";
import './createProduct.scss'

interface CreateProductProps {
  onClose: () => void
}

const CreateProduct: React.FC<CreateProductProps> = ({ onClose }) => {
  const dispatch = useAppDispath()
  const [title, setTitle] = useState<string>('')
  const [image, setImage] =useState<string>('https://i.pravatar.cc')
  const [description, setDescription] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [price, setPrice] = useState<number>()

  async function handleCreate(event: React.FormEvent){
    event.preventDefault()
    
    dispatch(createProduct({ title, image, description, category, price}))
    onClose()
  }

  return(
    <form className="form__create" onSubmit={handleCreate}>
      <input  className="input__title" 
              type="text" 
              value={title} 
              required 
              onChange={(e)=> setTitle(e.target.value)} 
              placeholder="Название товара"
              />
      <input  className="input__image" 
              type="text" 
              value={image} 
              onChange={(e)=> setImage(e.target.value)} 
              placeholder ="Ссылка на изображение"
              />
      <input  className="input__description" 
              type="text" 
              value={description} 
              required 
              onChange={(e)=> setDescription(e.target.value)}  placeholder="Описание товара"
              />
      <input  className="input__category" 
              type="text" 
              value={category} 
              required 
              onChange={(e)=> setCategory(e.target.value)}                     placeholder="Категория товара"
              />
      <input  className="input__price" 
              type="number"     
              value={price} 
              required      
              onChange={(e)=> setPrice(Number(e.target.value))} 
              placeholder="Цена товара"
              />
      <button type="submit" 
              className="form__btn">Создать</button>
    </form>
  )
}

export default CreateProduct