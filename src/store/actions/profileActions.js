
import Api from "../api"

function resEmail(data){
    if(data.EJ){
        Api.getCall('jobs/EmailTemplate.php?type='+ data.EJ +'&jobID='+ data.jobID);
    }
    if(data.E){
        Api.getCall('auth/EmailTemplate.php?type='+ data.E +'&userID='+ data.userID);
    }
} 

export const fetchProfile = (q) => {
    return (dispatch) => {
        return Api.getCall("jobs/about.php?jobSlug=" + q)
            .then(response => response.json())
            .then(json => dispatch({ type: "PROFILEDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const deleteSkill = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=DELETESKILL', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "SKILL", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const addSkill = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=ADDSKILL', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "SKILL", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const updateData = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=PROFILEUPDATE', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "PROFILEUPDATE", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const addIndustry = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=ADDINDUSTRY', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "INDUSTRY", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const deleteIndustry = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=DELETEINDUSTRY', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "INDUSTRY", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const deleteLanguage = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=LANGUAGEDELETE', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "LANGUAGE", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const addLanguage = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=LANGUAGEUPDATE', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "LANGUAGE", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const deleteWorkType = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=DELETEWORKTYPE', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "WORKTYPE", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const addWorkType = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=ADDWORKTYPE', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "WORKTYPE", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const addCity = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=ADDCITY', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "CITY", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const deleteCity = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=DELETECITY', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "CITY", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const addAccess = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=ADDACCESS', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "ACCESS", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const deleteAccess = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=DELETEACCESS', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "ACCESS", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const postJob = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=POSTJOB', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "POSTJOB", data: json }, resEmail(json)))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const applyJob = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=APPLYJOB', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "APPLYJOB", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const applyJobUpdate = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=APPLYJOBUPDATE', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "APPLYJOB", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}

export const fetchJobApply = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=FETCHAPPLYJOB', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "FETCHAPPLYJOB", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const viewJob = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=VIEWJOB', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "APPLYJOB", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchViewApply = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('jobs/aboutSet.php?type=FETCHVIEWJOB', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "FETCHVIEWJOB", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const fetchVerify = (body) => {
    return (dispatch, getState) => {
        return Api.postCall('auth/verify.php', body)
            .then(response => response.json())
            .then(json => dispatch({ type: "VERIFYDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const userVerify = (body) => {
    return (dispatch, getState) => {
        return Api.getCall('auth/EmailTemplate.php'+ body)
            .then(response => response.json())
            .then(json => dispatch({ type: "VERIFYDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
export const jobVerify = (body) => {
    return (dispatch, getState) => {
        return Api.getCall('auth/EmailTemplate.php'+ body)
            .then(response => response.json())
            .then(json => dispatch({ type: "VERIFYDATA", data: json }))
            .catch(err => dispatch({ type: "ERROR", msg: "Unable to fetch data" }))
    }
}
//jobs/EmailTemplate.php?type='+ data.EJ +'&jobID='+ data.jobID
