export const LoggedUserDataReducers = (state, acceptedDataFromComponent) => {
  switch (acceptedDataFromComponent.type) {
    case "ADD_ARRAY_TO_USER_DATA":
      return {
        ...state,
        LoggedUserDetailsAndLoanDataObjects: [
          ...state.LoggedUserDetailsAndLoanDataObjects,
          acceptedDataFromComponent.payload,
        ],
      };

    case "REMOVE_THE_NEXT_OBJECTS_BY_INDEX":
      return {
        ...state,
        ...state.LoggedUserDetailsAndLoanDataObjects.splice(
          acceptedDataFromComponent.payload
        )
      };

    case "SIGNOUT_REDUCER":
      return {
        ...state,
        LoggedUserDetailsAndLoanDataObjects: []
      }; 

    default:
      return state;
  }
};
