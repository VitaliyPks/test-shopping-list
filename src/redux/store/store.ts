import { configureStore } from '@reduxjs/toolkit'
import ShoppingListSlice from '../../pages/shoppingList.slice'

const store = configureStore({
  reducer: {
    shoppingList : ShoppingListSlice
  }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch