import {
  createContext,
  useReducer,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  PRODUCTS,
  PLATES,
  FAQS,
  BASKET,
  ALERT,
  SET_PLATE_LOADING,
  SET_PRODUCTS_LOADING,
} from "./Types";
import ClientReducer from "./ClientReducer";
import axios from "axios";
axios.defaults.baseURL = "https://api.t333scustoms.co.uk/";
export const ClientContext = createContext();

export const ClientState = (props) => {
  const initialState = {
    Plates: [],
    Products: [],
    Basket: [],
    Alerts: [],
    Faqs: [],
    isPlateLoading: false,
    isProductLoading: false,
  };

  // create a reducer and a state
  const [state, dispatch] = useReducer(ClientReducer, initialState);
  const alertsRef = useRef(state.Alerts);

  useEffect(() => {
    alertsRef.current = state.Alerts; // Keep ref updated with latest alerts
  }, [state.Alerts]);

  // Get all Products
  const GetAllProducts = async (page = 1, limit = 15) => {
    try {
      dispatch({ type: SET_PRODUCTS_LOADING, payload: true });
      const res = await axios.get(`/api/products?page=${page}&limit=${limit}`);
      dispatch({ type: SET_PRODUCTS_LOADING, payload: false });
      dispatch({ type: PRODUCTS, payload: res.data.data });
      return res.data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const GetAllPlate = async (page = 1, limit = 15) => {
    try {
      dispatch({ type: SET_PLATE_LOADING, payload: true });
      const res = await axios.get(
        `/api/numberplates?page=${page}&limit=${limit}`
      );
      dispatch({ type: SET_PLATE_LOADING, payload: false });
      dispatch({ type: PLATES, payload: res.data.data });
      return res.data.data;
    } catch (error) {
      console.error("Error fetching number plates:", error);
    }
  };

  const GetAllFAQs = async () => {
    try {
      const res = await axios.get(`/api/faqs`);
      dispatch({ type: FAQS, payload: res.data });
      return res.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const AddBasket = (item) => {
    if (item.Style) {
      const existingItem = state.Basket.find(
        (basketItem) =>
          basketItem.Number === item.Number &&
          basketItem.Plate === item.Plate &&
          basketItem.Side === item.Side &&
          basketItem.spacingChoice === item.spacingChoice &&
          basketItem.vehicleType === item.vehicleType
      );
      let updatedBasket = [];
      if (existingItem) {
        updatedBasket = state.Basket.map((basketItem) =>
          basketItem.Number === item.Number && basketItem.Plate === item.Plate
            ? { ...basketItem, Quantity: (basketItem.Quantity || 1) + 1 }
            : basketItem
        );
      } else {
        updatedBasket = [...state.Basket, { ...item, Quantity: 1 }];
      }
      dispatch({
        type: BASKET,
        payload: updatedBasket,
      });
    } else if (item.Name) {
      const existingItem = state.Basket.find(
        (basketItem) => basketItem._id === item._id
      );
      let updatedBasket = [];
      if (existingItem) {
        updatedBasket = state.Basket.map((basketItem) =>
          basketItem._id === item._id
            ? { ...basketItem, Quantity: (basketItem.Quantity || 1) + 1 }
            : basketItem
        );
      } else {
        updatedBasket = [...state.Basket, { ...item, Quantity: 1 }];
      }
      dispatch({
        type: BASKET,
        payload: updatedBasket,
      });
    }

    addAlert("Item added to basked");
  };

  const RemoveFromBasket = (item) => {
    // If it's a plate item
    if (item?.Style) {
      // Keep everything except the matching plate
      const updatedBasket = state.Basket.filter(
        (basketItem) =>
          !(
            basketItem.Number === item.Number &&
            basketItem.Plate === item.Plate &&
            basketItem.Side === item.Side &&
            basketItem.spacingChoice === item.spacingChoice &&
            basketItem.vehicleType === item.vehicleType
          )
      );

      dispatch({
        type: BASKET,
        payload: updatedBasket,
      });
      addAlert("Item Removed from basket", "error");
    }
    // If it's an accessory item
    else if (item?._id) {
      // Keep everything that doesn’t match _id
      const updatedBasket = state.Basket.filter(
        (basketItem) => basketItem._id !== item._id
      );

      dispatch({
        type: BASKET,
        payload: updatedBasket,
      });
      addAlert("Item Removed from basket", "error");
    }
  };

  const addAlert = useCallback((message, type = "success", timeout = 3000) => {
    if (alertsRef.current.some((alert) => alert.message === message)) return;

    const newAlert = { id: Date.now(), message, type };
    const updatedAlerts = [...alertsRef.current, newAlert].slice(-3); // Keep max 3 alerts

    dispatch({ type: ALERT, payload: updatedAlerts });

    setTimeout(() => {
      dispatch({
        type: ALERT,
        payload: alertsRef.current.filter((alert) => alert.id !== newAlert.id),
      });
    }, 2000);
  }, []);

  const handleQuantityChange = (item, Quantity) => {
    const updatedBasket = state.Basket.map((basketItem) => {
      if (
        item?.Number &&
        item?.Style &&
        basketItem.Number === item?.Number &&
        basketItem.Style === item?.Style
      ) {
        return { ...basketItem, Quantity: Quantity };
      } else if (item?.Name && basketItem._id === item._id) {
        return { ...basketItem, Quantity: Quantity };
      }
      return basketItem;
    });

    dispatch({
      type: BASKET,
      payload: updatedBasket,
    });
  };

  const CreateOrder = async (customer, formattedSubtotal) => {
    if (state.Basket.length < 1) return;

    try {
      const products = [];
      const plates = [];
      state.Basket.forEach((item) => {
        if (item.hasOwnProperty("Name")) {
          // This is an accessory/product
          products.push({
            Product: item._id,
            Quantity: item.Quantity,
          });
        } else if (item.hasOwnProperty("Style")) {
          // This is a plate item — extract only the fields you want
          plates.push({
            Plate: item.Plate,
            Side: item.Side,
            Number: item.Number,
            Style: item.Style,
          });
        }
      });

      const resCus = await axios.post(`/api/customers`, {
        Name: customer.Name,
        Email: customer.Email,
        Phone: customer.Phone,
      });
      const id = resCus.data?._id || resCus.data?.id;
      const order = {
        Customer: id,
        Address: {
          PostCode: customer.PostCode,
          HouseNumber: customer.HouseNumber,
          StreetAddress: customer.StreetName,
        },
        NumberPlates: plates,
        Products: products,
        Documents: customer.Documents,
        Shipped: false,
        CustomText: "Customer Placed Order",
        Status: "pending",
        TotalPrice: formattedSubtotal,
      };
      const res = await axios.post(`/api/orders`, order);
      return res.data;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <ClientContext.Provider
      value={{
        GetAllProducts: GetAllProducts,
        GetAllPlate: GetAllPlate,
        GetAllFAQs: GetAllFAQs,
        AddBasket: AddBasket,
        RemoveFromBasket: RemoveFromBasket,
        addAlert: addAlert,
        dispatch: dispatch,
        handleQuantityChange: handleQuantityChange,
        CreateOrder: CreateOrder,
        isPlateLoading: state.isPlateLoading,
        isProductLoading: state.isProductLoading,
        Plates: state.Plates,
        Products: state.Products,
        Basket: state.Basket,
        Faqs: state.Faqs,
        Alerts: state.Alerts,
      }}
    >
      {props.children}
    </ClientContext.Provider>
  );
};
