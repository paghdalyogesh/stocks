import optionChainReducer from './optionChainReducer'
import headerReducer from './headerReducer'
import profileReducer from './profileReducer'
import { combineReducers } from 'redux'


const rootReducer = combineReducers({
    optionChainReducer,
    headerReducer,
    profileReducer
});

export default rootReducer
