import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const host = process.env.REACT_APP_HOST
var getAPI = createAsyncThunk(
  "user/getAPI",
  async (arg, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${host}/users/getUserById?id=${arg}`
      );
      var data = await res.json();
      console.log("data");
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
    // let newInforUser = { ...arg };
    try {
      //   const res = await fetch(`http://localhost:8080/user/id=${newUser.id}`, {
      //     method: "put",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(newInforUser),
      //   });
      //   var data = await res.json();
      var data = { ...arg };
      if (data) {
        return data;
      }
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
var postAPI = createAsyncThunk(
  "user/postAPI",
  async (arg, { rejectWithValue }) => {
    // let newInforUser = { ...arg };

    try {
      //   const res = await fetch("http://localhost:8080/user", {
      //     method: "post",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(newInforUser),
      //   });
      //   var data = await res.json();
      var data = { ...arg };
      if (data) {
        return data;
      }
    } catch (error) {
      rejectWithValue(error.response.data);
    }
  }
);
var reducer = createSlice({
  name: "user",
  initialState: {
    data: undefined,
  },
  reducers: {
    updateMessage: (state, action) => {
      let mess = state.data.conversation.map((item) => ({ ...item }));
      let newMessage = mess.filter(
        (item, index) => item.id !== action.payload.id
      );
      console.log("kkkkk");
      console.log(action.payload);
      newMessage.unshift(action.payload);
      console.log(newMessage);
      state.data.conversation = newMessage;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAPI.fulfilled, (state, action) => {
        console.log(action.payload);
        state.data = action.payload;
      })
      .addCase(putAPI.pending, (state, action) => {
        return action.payload;
      })
      .addCase(postAPI.pending, (state, action) => {
        return action.payload;
      });
  },
});
export default reducer;
export const { updateMessage } = reducer.actions;
export { getAPI, putAPI, postAPI };
