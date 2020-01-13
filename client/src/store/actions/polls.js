import {SET_POLLS,SET_CURRENT_POLL} from '../actionTypes';
import {addError,removeError} from './error';
import api from '../../services/api';

export const setPolls = polls =>({
    type:SET_POLLS,
    polls
});

export const setCurrentPolls = poll =>({
    type:SET_CURRENT_POLL,
    poll
});
export const getPolls = () => {
    return async dispatch => {
        try {
            const polls = await api.call('get','poll');
            dispatch(setPolls(polls));
            dispatch(removeError());
        }
        catch(err){
            console.log(err);
        }
    }
}
export const getUserPolls = () =>{
    return async dispatch => {
        try{    
           const polls=await api.call('get','poll/user')
           console.log("second");
           dispatch(setPolls(polls));
           dispatch(removeError());
        }
        catch(err)
        {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    };
};

export const createPoll = data =>{
    return async dispatch => {
        try{
            console.log("reached in actions");
            const polls=await api.call('post','poll',data);
            console.log("dine");
            dispatch(setCurrentPolls(polls));
            dispatch(removeError());
        } 
        catch(err)
        {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    };
};


export const getCurrentPoll = path => {
    return async dispatch => {
        try{
             const poll = await api.call('get',`poll/${path}`);
             dispatch(setCurrentPolls(poll));
             dispatch(removeError()); 
        }
        catch(err)
        {
            const error = err.response.data;
            dispatch(addError(error.message));
        }
    }
}
export const vote = (path,data) =>{
    return async dispatch => {
        try{  
             const poll = await api.call('post',`poll/${path}`,data);
             dispatch(setCurrentPolls(poll));
             dispatch(removeError()); 
        }
        catch(err)
        {
            // console.log("oho",err.response.data.err);
            const error = err.response.data;
            dispatch(addError(error.err));
        }
    }
}