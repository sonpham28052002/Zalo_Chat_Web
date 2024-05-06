import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const host = process.env.REACT_APP_HOST;
var getAPI = createAsyncThunk(
  "user/getAPI",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await fetch(`${host}/users/getUserById?id=${arg}`);
      var data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);

var putAPI = createAsyncThunk(
  "user/putAPI",
  async (arg, { rejectWithValue }) => {
    console.log("put");
    console.log(arg);
    let newInforUser = { ...arg };
    try {
      const res = await fetch(
        "https://deploybackend-production.up.railway.app/users/updateUser",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newInforUser),
        }
      );
      var data = await res.json();
      if (data) {
        return data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

var reducer = createSlice({
  name: "user",
  initialState: {
    data: undefined,
    zegoCloudCall: undefined,
  },
  reducers: {
    updateZegoCloud: (state, actions) => {
      state.zegoCloudCall = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAPI.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(putAPI.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export default reducer;
export const { updateZegoCloud } = reducer.actions;
export { getAPI, putAPI };
