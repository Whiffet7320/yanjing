import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
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
            'token': sessionStorage.token,
            'Access-Control-Allow-Origin': '*',
            "access-control-allow-credentials": "true"
        }
    }
    return config;
}, error => {
    console.log(error);
    return Promise.reject();
})
myPost.interceptors.request.use(config => {
    if (sessionStorage.getItem("token")) {
        config.headers = {
            'token': sessionStorage.token,
            'Access-Control-Allow-Origin': '*',
            "access-control-allow-credentials": "true"
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
            'token': sessionStorage.token,
            'Access-Control-Allow-Origin': '*',
            "access-control-allow-credentials": "true"
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
    login(username, userpass) {
        return myPost({
            url: urls.login,
            data: {
                username,
                userpass,
            }
        })
    },
    logincheck(username, userpass) {
        return myPost({
            url: urls.logincheck,
            data: {
                username,
                userpass,
            }
        })
    },
    addclassify(title, username, userpass) {
        return myPost({
            url: urls.addclassify,
            data: {
                title,
                username,
                userpass
            }
        })
    },
    listclassify() {
        return myPost({
            url: urls.listclassify,
        })
    },
    updateclassify(title, sort, classify_id, username, userpass) {
        return myPost({
            url: urls.updateclassify,
            data: {
                title,
                sort,
                classify_id,
                username,
                userpass
            }
        })
    },
    delclassify(classify_id, username, userpass) {
        return myPost({
            url: urls.delclassify,
            data: {
                classify_id,
                username,
                userpass
            }
        })
    },
    updateswiper(pic, page, username, userpass) {
        return myPost({
            url: urls.updateswiper,
            data: {
                pic,
                page,
                username,
                userpass
            }
        })
    },
    delswiper(page, username, userpass) {
        return myPost({
            url: urls.delswiper,
            data: {
                page,
                username,
                userpass
            }
        })
    },
    viewswiper() {
        return myPost({
            url: urls.viewswiper,
        })
    },
    billagreementsetstatus(username, userpass, status) {
        return myPost({
            url: urls.billagreementsetstatus,
            data: {
                username,
                userpass,
                status
            }
        })
    },
    billagreementstatusview() {
        return myPost({
            url: urls.billagreementstatusview,
        })
    },
    billagreement(username, userpass, content) {
        return myPost({
            url: urls.billagreement,
            data: {
                username,
                userpass,
                content
            }
        })
    },
    billagreement_view() {
        return myPost({
            url: urls.billagreement_view,
        })
    },
    updateinvitation(username, userpass, obj) {
        return myPost({
            url: urls.updateinvitation,
            data: {
                username,
                userpass,
                ...obj
            }
        })
    },
    invitation_view() {
        return myPost({
            url: urls.invitation_view,
        })
    },
    addgoodspic(username, userpass, pic) {
        return myPost({
            url: urls.addgoodspic,
            data: {
                username,
                userpass,
                pic
            }
        })
    },
    goodspic_del(username, userpass, pic_url) {
        return myPost({
            url: urls.goodspic_del,
            data: {
                username,
                userpass,
                pic_url
            }
        })
    },
    goods_add(username, userpass, obj) {
        return myPost({
            url: urls.goods_add,
            data: {
                username,
                userpass,
                ...obj
            }
        })
    },
    goods_list(page, pagesize, keyword, classify_id) {
        return myPost({
            url: urls.goods_list,
            data: {
                page,
                pagesize,
                keyword,
                classify_id
            }
        })
    },
    goods_del(username, userpass, id) {
        return myPost({
            url: urls.goods_del,
            data: {
                username,
                userpass,
                id
            }
        })
    },
    goods_update(username, userpass, obj, id) {
        return myPost({
            url: urls.goods_update,
            data: {
                username,
                userpass,
                ...obj,
                id
            }
        })
    },
    user_freeorder(page, pagesize, keyword) {
        return myPost({
            url: urls.user_freeorder,
            data: {
                page,
                pagesize,
                keyword
            }
        })
    },
    quota_list(page, pagesize, keyword) {
        return myPost({
            url: urls.quota_list,
            data: {
                page,
                pagesize,
                keyword
            }
        })
    },
    quota_view(user_id) {
        return myPost({
            url: urls.quota_view,
            data: {
                user_id
            }
        })
    },
    user_order(page, pagesize, keyword, status) {
        return myPost({
            url: urls.user_order,
            data: {
                page,
                pagesize,
                keyword,
                status
            }
        })
    },
    guideset_content(username, userpass, content) {
        return myPost({
            url: urls.guideset_content,
            data: {
                username,
                userpass,
                content
            }
        })
    },
    guide_content() {
        return myPost({
            url: urls.guide_content,
        })
    },
    payment_set(obj) {
        return myPost({
            url: urls.payment_set,
            data: {
                ...obj
            }
        })
    },
    payment_view() {
        return myPost({
            url: urls.payment_view,
        })
    },
    centerbanner_list() {
        return myPost({
            url: urls.centerbanner_list,
        })
    },
    centerbanner_edit(username, userpass, pic, url, id, title, sub_title) {
        return myPost({
            url: urls.centerbanner_edit,
            data: {
                username,
                userpass,
                pic,
                url,
                id,
                title,
                sub_title
            }
        })
    },
    order_view(username, userpass, order_id) {
        return myPost({
            url: urls.order_view,
            data: {
                username,
                userpass,
                order_id
            }
        })
    },
    order_postsale(username, userpass, page, pagesize, status) {
        return myPost({
            url: urls.order_postsale,
            data: {
                username,
                userpass,
                page,
                pagesize,
                status
            }
        })
    },
    order_postsaleset(username, userpass, id, type) {
        return myPost({
            url: urls.order_postsaleset,
            data: {
                username,
                userpass,
                id,
                type
            }
        })
    },
    withdrawal_list(username, userpass, page, pagesize, status) {
        return myPost({
            url: urls.withdrawal_list,
            data: {
                username,
                userpass,
                page,
                pagesize,
                status
            }
        })
    },
    withdrawal(username, userpass, id, remark, status) {
        return myPost({
            url: urls.withdrawal,
            data: {
                username,
                userpass,
                id,
                remark,
                status
            }
        })
    },
}