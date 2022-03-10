import axios from 'axios';
import Vue from 'vue'
import router from '../router.js';
import urls from './url.js';
axios.defaults.withCredentials = true
const vue = new Vue()
let myPost = axios.create({
    baseURL: urls.baseUrl,
    method: 'post',
})
let myGet = axios.create({
    baseURL: urls.baseUrl,
    method: 'get',
})
let myDelete = axios.create({
    baseURL: urls.baseUrl,
    method: 'delete',
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
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
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
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
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
        console.log(response.data)
        if(response.data.code == 401){
            sessionStorage.setItem("isLogin", false);
            router.push({
                path: "/Shouye"
            })
            router.go(0)
        }else{
            return response.data
        }
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
    // if (response.status === 200) {
    //     return response.data
    // }
    if (response.status === 200) {
        console.log(response.data)
        if(response.data.code == 401){
            sessionStorage.setItem("isLogin", false);
            router.push({
                path: "/Shouye"
            })
            router.go(0)
        }else{
            return response.data
        }
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
    login(obj) {
        return myPost({
            url: urls.login,
            data: {
                ...obj
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
    products(obj) {
        return myGet({
            url: urls.products,
            params: {
                ...obj,
            }
        })
    },
    category() {
        return myGet({
            url: urls.category,
        })
    },
    productDetail(id) {
        return myGet({
            url: `${urls.productDetail}/${id}`,
        })
    },
    web_config() {
        return myGet({
            url: urls.web_config,
        })
    },
    coupon_list() {
        return myGet({
            url: urls.coupon_list,
        })
    },
    category_list(obj) {
        return myGet({
            url: urls.category_list,
            params:{
                ...obj
            }
        })
    },
    dushu_save(obj) {
        return myPost({
            url: urls.dushu_save,
            data: {
                ...obj,
            }
        })
    },
    user_info(obj) {
        return myGet({
            url: urls.user_info,
            params: {
                ...obj,
            }
        })
    },
    dushu_list(obj) {
        return myGet({
            url: urls.dushu_list,
            params: {
                ...obj,
            }
        })
    },
    product_storehouse_list(obj) {
        return myGet({
            url: urls.product_storehouse_list,
            params: {
                ...obj,
            }
        })
    },
    detail(id) {
        return myGet({
            url: `${urls.detail}/${id}`,
        })
    },
    collect(id) {
        return myPost({
            url: `${urls.collect}/${id}`,
        })
    },
    collect_list(obj) {
        return myGet({
            url: urls.collect_list,
            params: {
                ...obj,
            }
        })
    },
    cart_list(obj) {
        return myGet({
            url: urls.cart_list,
            params: {
                ...obj,
            }
        })
    },
    take_coupon(obj) {
        return myPost({
            url: urls.take_coupon,
            data: {
                ...obj,
            }
        })
    },
    product_type_list(obj) {
        return myGet({
            url: urls.product_type_list,
            params: {
                ...obj,
            }
        })
    },
    basicindex_list(obj) {
        return myGet({
            url: urls.basicindex_list,
            params: {
                ...obj,
            }
        })
    },
    product_type_color_list(obj) {
        return myGet({
            url: urls.product_type_color_list,
            params: {
                ...obj,
            }
        })
    },
    product_type_coatings_list(obj) {
        return myGet({
            url: urls.product_type_coatings_list,
            params: {
                ...obj,
            }
        })
    },
    add2cart(obj) {
        return myPost({
            url: urls.add2cart,
            data: {
                ...obj,
            }
        })
    },
    product_comment_list(id) {
        return myGet({
            url: `${urls.product_comment_list}/${id}`,
        })
    },
    country_list() {
        return myGet({
            url: `${urls.country_list}`,
        })
    },
    save_address(obj) {
        return myPost({
            url: urls.save_address,
            data: {
                ...obj,
            }
        })
    },
    address_list() {
        return myGet({
            url: `${urls.address_list}`,
        })
    },
    del_address(obj) {
        return myPost({
            url: urls.del_address,
            data: {
                ...obj,
            }
        })
    },
    order2pay(obj) {
        return myPost({
            url: urls.order2pay,
            data: {
                ...obj,
            }
        })
    },
    order_list(obj) {
        return myGet({
            url: `${urls.order_list}`,
            params:{
                ...obj
            }
        })
    },
    order_confirm(obj) {
        return myPost({
            url: urls.order_confirm,
            data: {
                ...obj,
            }
        })
    },
    order_express_detail(obj) {
        return myGet({
            url: `${urls.order_express_detail}`,
            params:{
                ...obj
            }
        })
    },
    async upload_img(image) {
        var configs = {
            headers: {
                "Content-Type": "multipart/form-data;charse=UTF-8",
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`,
            },
        };
        const res = await axios
            .post(`${urls.baseUrl}/api/upload_img`, image, configs)
        return res.data
    },
    order_comment(obj) {
        return myPost({
            url: urls.order_comment,
            data: {
                ...obj,
            }
        })
    },
    product_level_list(obj) {
        return myGet({
            url: `${urls.product_level_list}`,
            params:{
                ...obj
            }
        })
    },
    delcart(obj) {
        return myPost({
            url: urls.delcart,
            data: {
                ...obj,
            }
        })
    },
    user_coupon_list(obj) {
        return myGet({
            url: `${urls.user_coupon_list}`,
            params:{
                ...obj
            }
        })
    },
    user_comment_list(obj) {
        return myGet({
            url: `${urls.user_comment_list}`,
            params:{
                ...obj
            }
        })
    },
    del_user_comment(obj) {
        return myPost({
            url: urls.del_user_comment,
            data: {
                ...obj,
            }
        })
    },
    order_calc(obj) {
        return myPost({
            url: `${urls.order_calc}`,
            data:{
                ...obj
            }
        })
    },
    test(obj) {
        return myPost({
            url: urls.test,
            data: {
                ...obj,
            }
        })
    },
    register(obj) {
        return myPost({
            url: urls.register,
            data: {
                ...obj,
            }
        })
    },
    send_sms(obj) {
        return myPost({
            url: urls.send_sms,
            data: {
                ...obj,
            }
        })
    },
}