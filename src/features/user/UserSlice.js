import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolved, rejected) {
    navigator.geolocation.getCurrentPosition(resolved, rejected);
  });
}

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  }
);

const initialState = {
  userName: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserName(state, action) {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error = `There is a problem getting your address . make sure to fill this field!`;
      }),
});

export const { updateUserName } = userSlice.actions;
export default userSlice.reducer;
