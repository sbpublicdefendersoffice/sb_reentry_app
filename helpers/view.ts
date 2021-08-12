const viewReducer = (state, action) => {
  const { key, type, value } = action
  switch (type) {
    case 'setState': {
      const newState = { ...state }
      newState[key] = value
      return newState
    }
    case 'toggleList': {
      const newState = { ...state }
      newState.isListView = true
      newState.isMapView = false
      return newState
    }
    case 'toggleMap': {
      const newState = { ...state }
      newState.isMapView = true
      newState.isListView = false
      return newState
    }
    default: {
      return state
    }
  }
}
export default viewReducer
