import { createSlice } from '@reduxjs/toolkit'
import { CartState, ProductInCart } from '../app/types'

export const initialState: CartState = [
  // {
  //   amount: 5,
  //   amountAll: 12,
  //   id: 'id11',
  //   size: 'L',
  //   sex: "woman",
  //   brand: 'brand',
  //   color: 'string',
  //   price: 575,
  //   title: '1',
  //   images: [],
  //   rating: 'string',
  //   category: 'category',
  //   createdAt: 'string',
  //   thumbnail: 'data:image/jpeg;base64,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',
  //   description: 'string',
  //   discountPercentage: 20
  // },
]

const addLocalstorege = (sate: CartState) => {
  window.localStorage.setItem(
  'shoppingCartContents', JSON.stringify(sate)
  )
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action: {
      payload: ProductInCart ; type: string;
    }): CartState {
      const newState = state.concat(action.payload)
      addLocalstorege(newState)
      return newState
    },

    removeProductFromCart(state, action: {
      payload: string;
    }): CartState {
      const newState = state.filter((product) => product.id !== action.payload)
      addLocalstorege(newState)
      return newState
    },

    clearCart(): CartState {
     window.localStorage.removeItem('shoppingCartContents')
      return []
    },

    plusAmount(state, action: {
      payload: string;
    }) {
  
      const newState = state.map((product) => {
        if (product.id === action.payload && product.amount !== product.amountAll) {
          return { ...product, amount: product.amount + 1, }
        }
        return product
      })
      addLocalstorege(newState)
      return newState
    },

    minusAmount(state, action: {
      payload: string;
    }) {
      const newState = state.map((product) => {
        if (product.id === action.payload && product.amount !== 0) {
          return { ...product, amount: product.amount - 1, }
        }
        return product
      }).filter(product => product.amount !== 0)

      addLocalstorege(newState)
      return newState
    },
  },
}
)

export const { addProductToCart, removeProductFromCart, minusAmount, plusAmount, clearCart } = cartSlice.actions
export default cartSlice.reducer