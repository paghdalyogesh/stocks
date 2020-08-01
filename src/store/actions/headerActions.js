
import Api from "../api"

export const fetchHeader = () => {
    return (dispatch) => {
        return Api.getCall('auth/website.php')
            .then(response => response.json())
            .then(json => dispatch({ type: "HEADERDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchSkill = (q) => {
    return (dispatch) => {
        return Api.getCall("auto.php?type=SKILL&name="+ q)
            .then(response => response.json())
            .then(json => dispatch({ type: "SKILLDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchUser = (q) => {
    return (dispatch) => {
        return Api.getCall("auto.php?type=USER&name="+ q)
            .then(response => response.json())
            .then(json => dispatch({ type: "USERDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchCountry = () => {
    return (dispatch) => {
        return Api.getCall("auto.php?type=COUNTRY")
            .then(response => response.json())
            .then(json => dispatch({ type: "COUNTRYDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchCity = (a) => {
    return (dispatch) => {
        return Api.getCall("auto.php?type=CITY&name="+ a)
            .then(response => response.json())
            .then(json => dispatch({ type: "CITYDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchCompany = (a) => {
    return (dispatch) => {
        return Api.getCall("auto.php?type=COMPANY&name="+ a)
            .then(response => response.json())
            .then(json => dispatch({ type: "COMPANYDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchIndustry = (body) => {
    return (dispatch) => {
        return Api.getCall('auto.php?type=INDUSTRY', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "INDUSTRYDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchWorkType = (body) => {
    return (dispatch) => {
        return Api.getCall('auto.php?type=WORKTYPE', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "WORKTYPEDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}

export const fetchJobApplyStatus = () => {
    return (dispatch) => {
        return Api.getCall("auto.php?type=JOBAPPLYSTATUS")
            .then(response => response.json())
            .then(json => dispatch({ type: "JOBAPPLYSTATUSDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}

export const fetchLanguages = (q) => {
    return (dispatch) => {
        return Api.getCall("auto.php?type=LANGUAGES&name="+ q)
            .then(response => response.json())
            .then(json => dispatch({ type: "LANGUAGEDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}