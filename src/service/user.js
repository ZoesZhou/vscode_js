//与服务器端交换传递数据的

import axios from 'axios';
import { observable } from 'mobx';
import store from 'store';

//加载expire过期插件
store.addPlugin(require('store/plugins/expire'));

class UserService {
    @observable loggedin = false;//一开始被观察者设置false
    @observable errMsg = '';//观察错误信息

    login(email, password) {
        //todo 从view层发来的邮箱和密码，转发给后台服务器
        console.log(email)
        console.log(password)
        console.log('````````````````````')
        //在页面点击按钮，从表单中提取了两个数据，这两个数据传到login
        //login函数调用后，axios发起一个异步请求，就跑到后端去了
        axios.post('/api/user/login', {
            //dev server会代理
            'email': email,
            'password': password
        }).then(response => {
            //此处箭头函数保证this不会出错
            console.log(response, '--0-0-0-0-0-0');
            console.log(response.data);
            const { token, user } = response.data;
            console.log(token);
            //设置token过期时间
            store.set('token', token, new Date().getTime() + 8 * 3600 * 1000);
            console.log(user);
            //异步请求后得到数据被观察者设为true
            this.loggedin = true;
        }).catch(error => {
            console.log(error, '--2-2-2-2--2-22-');
            this.loggedin = false;
            this.errMsg = '用户名密码错误';//修改被观察者
        });
    }

    reg(email, name, password, flag) {
        console.log(email, name, password)
        if (flag) {
            axios.post('/api/user/reg', {
                //dev server会代理
                email, name, password
            }).then(response => {
                //此处箭头函数保证this不会出错
                console.log(response);
                console.log(response.data);
                const { token, user } = response.data;
                console.log(token);
                console.log(user);
                //存储token
                store.set('token', token, new Date().getTime() + 8 * 3600 * 1000);
                //注册成功，返回token即成功登录
                //异步请求后得到数据被观察者设为true
                this.loggedin = true;
            })
                .catch(error => {
                    console.log(error, '44444444444');
                    //   this.loggedin = false;
                    this.errMsg = '注册失败';
                });
        }
        else {
            this.errMsg = '注册失败';
        }
    }
}
//注册与登录要公用一个实例
const userService = new UserService();
export { userService };



        //同步调用，不采用
        // let n = 10
        // for (let d = new Date(); (new Date()) - d < n * 1000;);

        // return Math.random() * 1000;

        // //异步调用promise，要从外部传入this
        // new Promise((resolve, reject) => {
        //     setTimeout(() => resolve('ok'), 10000);
        // }).then(value => {
        //     obj.setState({ret:'````'+Math.random()*100})
        // })














