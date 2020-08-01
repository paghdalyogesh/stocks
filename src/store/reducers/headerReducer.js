
const intialState = {
    webInfo: null,
    skill: null,
    country: null,
    error: ""
}

const headerReducer = (state = intialState, action) => {

    switch (action.type) {
        case "HEADERDATA":
            return { ...state, webInfo: action.data }
        case "SKILLDATA":
            return { ...state, skill: action.data }
        case "COUNTRYDATA":
            return { ...state, country: action.data }
        case "CITYDATA":
            return { ...state, city: action.data }
        case "COMPANYDATA":
            return { ...state, company: action.data }
        case "INDUSTRYDATA":
            return { ...state, industries: action.data }
        case "WORKTYPEDATA":
            return { ...state, worktypes: action.data }            
        case "LANGUAGEDATA":
            return { ...state, languages: action.data } 
        case "USERDATA":
            return { ...state, users: action.data } 
        case "JOBAPPLYSTATUSDATA":
            return { ...state, jobApplyStatus: action.data }     
        case "ERROR":
            return { ...state, error: action.msg }
        default:
            return state
    }
}
export default headerReducer