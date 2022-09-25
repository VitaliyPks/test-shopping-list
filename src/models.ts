export interface IProduct{
  id: number
  title: string
  price: number
  description: string
  category:string
  image:string
  rating?:{
    rate:number
    count:number
  }
}

export interface ProductListState{
  productList: IProduct[]
  error: null | string
  notificationMessage: string
}

export interface IModalContext {
  modal: boolean
  open: () => void
  close: () => void
}

export interface IProductCreate{
  title: string
  price: number | undefined
  description: string
  category:string
  image:string
}