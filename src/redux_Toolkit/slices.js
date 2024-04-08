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
  },
  reducers: {
    addMessage: (state, actions) => {
      const { mess, id, type } = actions.payload;
      for (let index = 0; index < state.data.conversation.length; index++) {
        if (
          state.data.conversation[index].conversationType === type &&
          state.data.conversation[index].user.id === id
        ) {
          state.data.conversation[index].messages = mess;
          break;
        }
      }
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
export const { addMessage } = reducer.actions;
export { getAPI, putAPI };
