import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProduct, IProductCreate, ProductListState } from '../models'

const initialState: ProductListState = {
  productList: [],
  error: null,
  notificationMessage: ''
}

const loadProductList = createAsyncThunk<IProduct[], undefined,{rejectValue:string}>(
  'productList/load',
  async (_, { rejectWithValue }) => {

    const response = await fetch('https://fakestoreapi.com/products?limit=3')

    if (!response.ok) {
      return rejectWithValue('Server error')
    }

    const data:IProduct[] = await response.json()

    return data
  }
)

const createProduct = createAsyncThunk<IProduct, IProductCreate,{rejectValue:string}>(
  'product/added',
  async (payload, { rejectWithValue }) => {
    
    const response = await fetch('https://fakestoreapi.com/products',{
      method: "POST",
      headers: {'Content-Type':'Application/json'},
      body: JSON.stringify({
        title: payload.title,
        image: payload.image,
        description: payload.description,
        category: payload.category,
        price: payload.price
      })
    })

    if (!response.ok) {
      return rejectWithValue('Server error')
    }

    const data: IProduct = await response.json()
    
    return data
  }
)


const shoppingListSlice = createSlice({
  name: 'shoppingList',
  initialState,
  reducers: {
      deletProduct(state,action: PayloadAction<string | undefined>){
        const checkDelete = state.productList.length
        state.productList = state.productList.filter(el => el.id !== Number(action.payload))

        if(checkDelete !== state.productList.length){
          state.notificationMessage = 'Удаление прошло успешно!'
        } else {
          state.notificationMessage = 'Удалить товар не получилось!'
        }
      },
      viewNotification (state, action: PayloadAction<string>){
        state.notificationMessage = action.payload
      },
      buyProduct(state){
        const sumProductPrice = state.productList.reduce((sum , price) => sum + price.price,0)
        state.productList = []

        if(state.productList.length === 0) {
          state.notificationMessage = `Покупка успешно завершенна. Сумма заказа ${sumProductPrice} рублей. Подробности заказа придут в ближайшее время на почту.`
        } else {
          state.notificationMessage = 'Ошибка покупки. Повторите попытку позже.'
        }
      }
    },
  extraReducers: (builder) => {
    builder
        .addCase(loadProductList.fulfilled, (state, action)=> {
          state.productList = action.payload
        })
        .addCase(createProduct.fulfilled, (state, action:PayloadAction<IProduct>) => {
          // От API прохит один и тот же id, поэтому пришлось сделать рандомный уникальный id вручную, чтобы корректно работало удаление.
          const uniqId:number = Math.floor((Math.random() * 1000) + 3) 
          const newProduct = {...action.payload, id:uniqId}
          const checkCreate = state.productList.length
          state.productList.push(newProduct)

          if(checkCreate !== state.productList.length){
            state.notificationMessage = 'Товар успешно создан!'
          } else {
            state.notificationMessage = 'Товар не получилось создать!'
          }
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
          state.error = action.payload
        })
     
  }
  })

export {
  loadProductList,
  createProduct
}

export const {
  deletProduct,
  viewNotification,
  buyProduct
} = shoppingListSlice.actions

export default shoppingListSlice.reducer

function isError (action: AnyAction): boolean {
  return action.type.endsWith('rejected')
}