import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

var getAPI = createAsyncThunk(
  "user/getAPI",
  async (arg, { rejectWithValue }) => {
    try {
      //   const res = await fetch(`http://localhost:8080/user/id=${arg}`);
      //   var data = await res.json();
      var data = arg;
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
    data: {
      id: "65dce7e90d0aa82b91ee72b7",
      gender: "Nam",
      name: "Phạm Thanh Sơn",
      DOB: "2002-05-28",
      avt: "https://s120-ava-talk.zadn.vn/c/b/f/1/8/120/fa77be6399bd4028983cfc723dda9494.jpg",
      friends: [],
      conversations: [],
      Bio: "Leon",
      phone: "+84346676956",
      isOnline: true,
      coverImage:
        "https://cover-talk.zadn.vn/e/d/7/1/1/fa77be6399bd4028983cfc723dda9494.jpg",
      logOutTimeDate: "2016-05-18T16:00:00Z",
      logInTimeDate: new Date(),
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAPI.pending, (state, action) => {
        console.log(state.data);
      })
      .addCase(putAPI.pending, (state, action) => {
        console.log(state.data);
      })
      .addCase(postAPI.pending, (state, action) => {
        console.log(state.data);
      });
  },
});
export default reducer;
export { getAPI, putAPI, postAPI };
