import {
  PLATES,
  PRODUCTS,
  FAQS,
  BASKET,
  ALERT,
  SET_PLATE_LOADING,
  SET_PRODUCTS_LOADING,
} from "./Types";

const ClientReducer = (state, action) => {
  switch (action.type) {
    default:
      return { ...state };
    case PRODUCTS: {
      return { ...state, Products: action.payload };
    }
    case PLATES: {
      return { ...state, Plates: action.payload };
    }
    case FAQS: {
      return { ...state, Faqs: action.payload };
    }
    case BASKET: {
      return { ...state, Basket: action.payload };
    }
    case ALERT: {
      return { ...state, Alerts: action.payload };
    }
    case SET_PLATE_LOADING: {
      return { ...state, isPlateLoading: action.payload };
    }
    case SET_PRODUCTS_LOADING: {
      return { ...state, isProductLoading: action.payload };
    }
  }
};

export default ClientReducer;
