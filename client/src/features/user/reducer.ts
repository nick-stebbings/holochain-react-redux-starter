import { Profile } from "./types";
import { createSlice, createAction, PayloadAction } from "@reduxjs/toolkit";
import { asyncHoloAction } from "./actions";

import { base64string as defaultImage } from "./defaultImageb64";

export const initialState: Profile = {
  nickname: "",
  fields: { avatar: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(asyncHoloAction.success(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;
      return {
        nickname: payload.profile.nickname,
        fields: {
          avatar: payload.profile.avatar || defaultImage,
          agentId: payload.agent_pub_key,
        },
      };
    });
    builder.addCase(asyncHoloAction.failure(), (state, action) => {
      const {
        payload,
        meta: { cellIdString },
      } = action;
      debugger;
      return state;
    });
  },
});

export default userSlice.reducer;
