import React, { useState, useEffect } from "react";
import { Profile as ProfileType } from "../../types";
import { createUser } from "../../actions";
import { ProfileCard } from "./ProfileCard";

import { useAppDispatch } from "@app/hooks";
import { store } from "@app/store";

export const Profile: React.FunctionComponent<{}> = () => {
  const dispatch = useAppDispatch();
  const [userProfile, setUserProfile] = useState<ProfileType>(
    store.getState()?.user
  );
  const [isValidForm, setIsValidForm] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleCreateUser = async (e: any) => {
    e.preventDefault();
    if (userProfile?.nickname === "" || userProfile?.nickname.length < 3)
      return setIsValidForm(false);

    const cellIdString = store.getState()?.cell?.cellIdString;
    await dispatch(
      createUser(
        cellIdString,
        userProfile?.nickname,
        userProfile?.fields?.avatar
      )
    );
    setIsSubmitted(true);
  };

  useEffect(() => {
    setUserProfile(store.getState()?.user);
  }, [isSubmitted]);

  return (
    <React.Fragment>
      {!isValidForm && <h5>Please enter a name of at least 3 characters.</h5>}
      <ProfileCard
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        handleSubmit={handleCreateUser}
      />
    </React.Fragment>
  );
};
