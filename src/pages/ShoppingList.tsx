import React, { useContext } from "react";
import CreateProduct from "../components/createProduct/CreateProduct";
import Modal from "../components/modal/Modal";
import { ModalContext } from "../modalContext/ModalContext";
import Notification from "../components/notification/Notification";
import ProductList from "../components/productList/ProductList";
import { useAppSelector } from "../redux/hook/hook";
import ButtonNewProduct from "../components/buttons/ButtonNewProduct";
import ButtonBuy from "../components/buttons/ButtonBuy";

const ShoppingList: React.FC = () =>{
  const { modal,open,close } = useContext(ModalContext)
  const message = useAppSelector(state => state.shoppingList.notificationMessage)

  return (
    <>
      {modal && <Modal onClose={close}>
         <CreateProduct onClose={close} />
      </Modal>}
      {message && <Notification/>}
      <ButtonNewProduct onOpen={open}/>
      <ButtonBuy/>
      <ProductList />
    </>
  )
}

export default ShoppingList