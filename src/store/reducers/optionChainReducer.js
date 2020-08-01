
const intialState = {
    data: null,
    error: "",
    filt: null
}

const optionChainReducer = (state = intialState, action) => {
    switch (action.type) {
        case "FetchData":
            return { ...state, data: action.data }
        default:
            return state
    }
}
export default optionChainReducer