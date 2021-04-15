import {
  LOGIN_USER,
  LOGIN_USER_ERROR,
  START_LOADING,
  STOP_LOADING,
  REGISTER_USER,
  REGISTER_USER_ERROR,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
  OTHER_USER_DETAILS,
  CLEAR_OTHER_USER_DETAILS
} from "../types.js";

const AuthReducer=(state,action)=>{
switch(action.type){
    case LOGIN_USER: 
     localStorage.setItem("userInfo", JSON.stringify([action.payload.userInfo]));
    return {
        ...state,
        isAuthenticated:true,
        userInfo:[action.payload.userInfo],   
        message:action.payload.message,
        error:null
    }
    case REGISTER_USER:
      return{
        ...state,
message:action.payload.message
      }
      case REGISTER_USER_ERROR:
   case LOGIN_USER_ERROR:
    return {
      ...state,
      error:action.payload,
      authLoading:false
    }
case OTHER_USER_DETAILS:
  return {
    ...state,
    otherUserDetails:action.payload.user,
    message:action.payload.message
  }
    case START_LOADING:
    return{
      ...state,authLoading:true
    }
    case STOP_LOADING:
      return{
     ...state,authLoading:false
    }
    case CLEAR_ERROR:
      return{
        ...state,error:null
      }
      case CLEAR_MESSAGE:
        return{
          ...state,
          message:null
        }
        case CLEAR_OTHER_USER_DETAILS:
          return{
            ...state,
            otherUserDetails:null
          }
    default:
      return state;
}
}
export default AuthReducer;