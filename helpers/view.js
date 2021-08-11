const viewReducer = (state, action) => {
    const { key, type, value } = action;
    switch (type) {
        case 'setState': {
            const newState = Object.assign({}, state);
            newState[key] = value;
            return newState;
        }
        case 'toggleList': {
            const newState = Object.assign({}, state);
            newState.isListView = true;
            newState.isMapView = false;
            return newState;
        }
        case 'toggleMap': {
            const newState = Object.assign({}, state);
            newState.isMapView = true;
            newState.isListView = false;
            return newState;
        }
        default: {
            return state;
        }
    }
};
export default viewReducer;
