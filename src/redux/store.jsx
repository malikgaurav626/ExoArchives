import { configureStore,createSlice } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

const initialState = {
    routeLocation: 0,
    isDataLoaded: false,
    data: [],
    uniqueHeaders: {
        'Host Name': [],
        'Discovery Method': [],
        'Discovery Year': [],
        'Discovery Facility': [],
    },
    userSelection: {
        'Host Name': 'Host Name',
        'Discovery Method': 'Discovery Method',
        'Discovery Year': 'Discovery Year',
        'Discovery Facility': 'Discovery Facility',
    },
    btnRoute: 0,

}


const dataSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setRouteLocation: (state, action)=>{
            state.routeLocation = action.payload;
        },
        setIsDataLoaded: (state, action)=>{
            state.isDataLoaded = action.payload;
        },
        setData: (state, action)=>{
            state.data = action.payload;
        },
        setUniqueHeaders: (state, action)=>{
            state.uniqueHeaders = action.payload;
        },
        setUserSelection: (state, action)=>{
            state.userSelection = action.payload;
        },
        setBtnRoute: (state, action)=>{
            state.btnRoute = action.payload;
        }
    }

})

const store = configureStore(
    {
        reducer: dataSlice.reducer,
        middleware: [thunk],
    }
);

export const { setRouteLocation, setIsDataLoaded, setData, setUniqueHeaders, setUserSelection, setBtnRoute} = dataSlice.actions;


export default store;