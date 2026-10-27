import { getAddress } from "../../services/apiGeocoding";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition();
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   };

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position);
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address };
// }
// redux is synchrouns way so we need to use thunk==> middleware  | createAsyncThunk(actionName , async function that will return the payload for the reducer) this function will be action creator that can we use in our code
// notice that the createAsyncThunk will produce three action types => 1.depending promise state , 2.fulfilled state , 3.rejected state
export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    // that data it will return it will the payload  of fulfilled state
    return { position, address };
  },
);

const initialState = {
  userName: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};
// create actions automatically
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      // handle the 2 cases of promise => fulfilled , reject | chaining the cases
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      // handle possible error
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "error";
        state.error =
          action.payload?.message ||
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateUserName } = userSlice.actions;

// reducer that we will setup our store
export default userSlice.reducer;
