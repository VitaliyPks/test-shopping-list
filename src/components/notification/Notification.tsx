import React from "react";
import { viewNotification } from "../../pages/shoppingList.slice";
import { useAppDispath, useAppSelector } from "../../redux/hook/hook";
import './notification.scss'

const Notification: React.FC = () => {
  const dispatch = useAppDispath()
  const message = useAppSelector(state => state.shoppingList.notificationMessage)

  function deleteMessage(){
    dispatch(viewNotification(''))
  }

  return(
    <div className="notif__container">
      <p className="notif__message">{message}</p>
      <span className="message__delete" onClick={deleteMessage}></span>
    </div>
  )
}

export default Notification