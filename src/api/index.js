import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
axios.defaults.withCredentials = true
const vue = new Vue()
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
    timeout: 1000,
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
    timeout: 1000,
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
    timeout: 1000,
})

myDelete.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'X-Token': sessionStorage.getItem("token"),
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    console.log(sessionStorage.getItem("token"))
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myGet.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.getItem("token"),
            // 'Access-Control-Allow-Origin': '*',
            // "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.response.use(response => {
    // console.log(response)
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error)
    if (error.response.status === 500) {
        console.log(vue)
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})
myGet.interceptors.response.use(response => {
    if (response.status === 200) {
        return response.data
    }
    // if (response.status === 200 && response.data.code == '200') {
    //     vue.$message({
    //         message: response.data.msg,
    //         type: "success",
    //     });
    //     return response.data;
    // }
    else {
        vue.$message.error(response.data.info);
        Promise.reject();
    }
}, error => {
    //错误跳转
    console.log(error);
    if (error.response.status === 500) {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    } else if (error.response.status === 401) {
        sessionStorage.setItem("isLogin", false);
        console.log(sessionStorage.getItem("isLogin"));
        router.push({
            path: "/"
        })
        router.go(0)
        return Promise.reject();
    } else if (error.response.status === 404) {
        vue.$alert('页面不存在', '404错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else if (error.response.status === 402) {
        vue.$alert('请求次数限制', '402错误', {
            confirmButtonText: '确定',
        });
        return Promise.reject();
    } else {
        if (error.response.data.info != '参数错误') {
            vue.$message.error(error.response.data.info);
        }
    }
})

export default {
    login(username, password, code) {
        return myPost({
            url: urls.login,
            data: {
                username,
                password,
                code
            }
        })
    },
    getVerificationCode(obj) {
        return myPost({
            url: urls.getVerificationCode,
            data: {
                ...obj,
            }
        })
    },
    username(obj) {
        return myPost({
            url: urls.username,
            data: {
                ...obj,
            }
        })
    },
    getOrder(obj) {
        return myPost({
            url: urls.getOrder,
            params: {
                ...obj,
            }
        })
    },
    verificationSession(obj) {
        return myPost({
            url: urls.verificationSession,
            data: {
                ...obj,
            }
        })
    },
    inviteReward(obj) {
        return myPost({
            url: urls.inviteReward,
            data: {
                ...obj,
            }
        })
    },
    userInfo(obj) {
        return myPost({
            url: urls.userInfo,
            data: {
                ...obj,
            }
        })
    },
    getGoods(obj) {
        return myPost({
            url: urls.getGoods,
            data: {
                ...obj,
            }
        })
    },
    kdPrice(obj) {
        return myPost({
            url: urls.kdPrice,
            data: {
                ...obj,
            }
        })
    },
    editIndex(obj) {
        return myPost({
            url: urls.editIndex,
            data: {
                ...obj,
            }
        })
    },
    editData(obj) {
        return myPost({
            url: urls.editData,
            data: {
                ...obj,
            }
        })
    },
    upLevelDefault(obj) {
        return myPost({
            url: urls.upLevelDefault,
            data: {
                ...obj,
            }
        })
    },
    searchData(obj) {
        return myPost({
            url: urls.searchData,
            data: {
                ...obj,
            }
        })
    },
    getKefu(obj) {
        return myPost({
            url: urls.getKefu,
            data: {
                ...obj,
            }
        })
    },
    switchYc(obj) {
        return myPost({
            url: urls.switchYc,
            data: {
                ...obj,
            }
        })
    },
    AftermarketAddData(obj) {
        return myPost({
            url: urls.AftermarketAddData,
            data: {
                ...obj,
            }
        })
    },
    AftermarketGetData(obj) {
        return myPost({
            url: urls.AftermarketGetData,
            data: {
                ...obj,
            }
        })
    },
    UserEditPassword(obj) {
        return myPost({
            url: urls.UserEditPassword,
            data: {
                ...obj,
            }
        })
    },
    UserCheckYzm(obj) {
        return myPost({
            url: urls.UserCheckYzm,
            data: {
                ...obj,
            }
        })
    },
    ArticleList(obj) {
        return myPost({
            url: urls.ArticleList,
            data: {
                ...obj,
            }
        })
    },
    ArticleInfo(obj) {
        return myPost({
            url: urls.ArticleInfo,
            data: {
                ...obj,
            }
        })
    },
    orderInsertData(obj) {
        return myPost({
            url: urls.orderInsertData,
            data: {
                ...obj,
            }
        })
    },
    orderDelOrder(obj) {
        return myPost({
            url: urls.orderDelOrder,
            data: {
                ...obj,
            }
        })
    },
    orderGetFilterData(obj) {
        return myPost({
            url: urls.orderGetFilterData,
            data: {
                ...obj,
            }
        })
    },
    alipayGetPay(obj) {
        return myPost({
            url: urls.alipayGetPay,
            data: {
                ...obj,
            }
        })
    },
    userInvitationReward(obj) {
        return myPost({
            url: urls.userInvitationReward,
            data: {
                ...obj,
            }
        })
    },
    userMoneyList(obj) {
        return myPost({
            url: urls.userMoneyList,
            data: {
                ...obj,
            }
        })
    },
    CommentEditIndexPassword(obj) {
        return myPost({
            url: urls.CommentEditIndexPassword,
            data: {
                ...obj,
            }
        })
    },
    userAddLevel(obj) {
        return myPost({
            url: urls.userAddLevel,
            data: {
                ...obj,
            }
        })
    },
    userReCharge(obj) {
        return myPost({
            url: urls.userReCharge,
            data: {
                ...obj,
            }
        })
    },
    userCommission(obj) {
        return myPost({
            url: urls.userCommission,
            data: {
                ...obj,
            }
        })
    },
    alipayQueryOrder(obj) {
        return myPost({
            url: urls.alipayQueryOrder,
            data: {
                ...obj,
            }
        })
    },
}