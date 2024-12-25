import * as actionTypes from './actionTypes'
import axios from 'axios';
export const authStart =() =>{
    return{
        type: actionTypes.AUTH_START
    }
}
export const authSuccess =token =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        token:token
    }
}
 
export const authFail =error =>{
    return{//trả về action trong redux cần có ít nhất 1 type và 1 payload(dữ liệu bổ sung muốn gửi kèm hành động)
        type: actionTypes.AUTH_FAIL,//thuộc tính type mô tả hành động mà bạn muốn thực hiện 
        error: { 
            message: error.message, // Chỉ lưu thông điệp lỗi
            status: error.response.status // Mã trạng thái HTTP (nếu có)
        }

    }
}

export const logout =()=>{
    localStorage.removeItem('user');
    localStorage.removeItem('expirationDate');
    return{
        type: actionTypes.AUTH_LOGOUT
    };
}

export const checkAuthTimeOut = expirationTime =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());

        },expirationTime *1000)
    }
}

export const authLogin =(username, password) =>{
    return dispatch =>{
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/login/',{
            username:username,
            password:password
        })
        .then(res=>{
            const token=res.data.key;
            const expirationDate = new Date(new Date().getTime()+ 3600*1000);
            localStorage.setItem('token', token );
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err =>{
            dispatch(authFail(err))
        } )
    }
}   

export const authSignup =(username,email,password1, password2) =>{
    return dispatch =>{
        dispatch(authStart());
        axios.post('http://127.0.0.1:8000/rest-auth/registration/',{
            username:username,
            email:email,
            password1:password1,
            password2:password2
        })
        .then(res=>{
            const token=res.data.key;
            const expirationDate = new Date(new Date().getTime()+ 3600*1000);
            localStorage.setItem('token', token );
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkAuthTimeOut(3600));
        })
        .catch(err =>{
            dispatch(authFail({
                message: err.message,
                status: err.response.status
            }));
        } )
    }
}
//dispatch được sử dụng để gửi các hành động đến "store" trong Redux. Nó giúp cập nhật trạng thái toàn bộ ứng dụng dựa vào các hành động như đăng nhập, đăng xuất, hoặc các thay đổi khác.

export const authCheckState=()=>{
    return dispatch =>{
        const token = localStorage.getItem('token');
        if(token === undefined){
            dispatch(logout());

        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if (expirationDate <= new Date()){
                dispatch(logout());
            }else{
                dispatch(authSuccess(token));
                dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000 ));
            }
        }
    }
}