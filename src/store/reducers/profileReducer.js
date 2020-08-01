
const intialState = {
    info: null,
    error: "",
}

const profileReducer = (state = intialState, action) => {
    switch (action.type) {
        case "PROFILEDATA":
            return { ...state, info: action.data }
        case "SKILL":
            state.info.jobSkill = action.data.skill;
            return { ...state }
        case "PROFILEUPDATE":
            state.info.users = action.data.users;
            return { ...state }
        case "INDUSTRY":
            state.info.jobIndustry = action.data.industry;
            return { ...state }
        case "EXPERIENCE":
            state.info.userExp = action.data.employment;
            return { ...state }
        case "LANGUAGE":
            state.info.jobLanguage = action.data.language;
            return { ...state }
        case "WORKTYPE":
            state.info.jobWorkType = action.data.workType;
            return { ...state }
        case "CITY":
            state.info.jobCity = action.data.city;
            return { ...state }
        case "ACCESS":
            state.info.jobAccess = action.data.jobAccess;
            return { ...state }
        case "POSTJOB":
            state.postJob = action.data;
            return { ...state }
        case "APPLYJOB":
            state.info.jobApplyText = action.data.jobApplyText;
            return { ...state }
        case "FETCHAPPLYJOB":
            state.info.jobApply = action.data;
            return { ...state }
        case "FETCHVIEWJOB":
            state.info.jobView = action.data;
            return { ...state }
        case "APPLYJOBUPDATE":
            //state.info.jobApply = action.data.jobApply;
            return { ...state }
        case "VERIFYDATA":
            return { ...state, webVerify: action.data }
        case "ERROR":
            return { ...state, error: action.msg }
        default:
            return state
    }
}
export default profileReducer