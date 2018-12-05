import axios from 'axios';
import { observable } from 'mobx';
import store from 'store';
store.addPlugin(require('store/plugins/expire'));

class PostService {
    constructor(props) {
        this.axios = axios.create({
            baseURL: '/api/post/'
        })
    }
    @observable msge = '';
    @observable loggedin = '';//设置被观察者
    @observable posts = [];//博文列表，通知数据是否拿到
    //分页信息
    @observable pagination = { page: 1, size: 20, pages: 1, count: 0 };//通知数据是否拿到
    @observable post = {};

    getToken() {
        //拿到token值,验证是否过期，过期返回一个空值
        // if (store.getExpiration('token')) return '';
        return store.get('token', '')
    }
    pub(title, content) {
        console.log('=================')
        console.log(store.get('token'))
        console.log(title)
        console.log(content)
        console.log('=================')
        //如果token为空值，跳转到登录页
        if (this.getToken() === '') {
            loggedin = true;
            // 未登录提示loggedin为定义
        }
        this.axios.post('pub', {
            title, content
        }, {
                //拿到token值给post的headers部分传过去
                //dev server会代理
                headers: { 'jwt': this.getToken() }
            }).then(response => {
                console.log(1, response);
                console.log(response.data);
                this.msge = '博客提交成功';
            }).catch(error => {
                console.log(5, error);
                this.msge = '博客提交失败';
            });
    }
    //去后端getall拿数据
    list(search) {
        //  /List?page=2&size=10 => constructor ?page=2&size=10 =>
        //  service list(?page=2&size=10) => /api/post/page=2&size=10
        this.axios.get(search).then(response => {
            console.log(1, response);
            console.log(response.data);//posts,pagination
            const { posts = [], pagination = {} } = response.data;
            this.posts = posts;
            this.pagination = pagination;
        }).catch(error => {
            console.log(4, error);
            this.msge = '博客列表获取失败';
        });
    }

    getPost(id) {
        // /detail/2 => constructor 2 =>
        // service list(2) => /api/post/2
        this.axios.get(id).then(response => {
            console.log(1, response);
            console.log(response.data);
            this.post = response.data.post;
        }).catch(error => {
            console.log(3, error);
            this.msge = '博客内容获取失败';
        });
    }
}


const postService = new PostService();
export { postService };


