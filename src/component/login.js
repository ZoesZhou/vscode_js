import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/login.css';
import { userService as service } from '../service/user';
import { observer } from 'mobx-react';
import { message, Button } from 'antd';//antd友好信息提示
import 'antd/lib/message/style';//antd信息样式导入
import { injects } from '../utils';

// export default class Login extends React.Component {
//     render() {
//         //将service属性从外部注入给Login类
//         return <_Login service={service} />
//     }
// }

@injects({service})//注入属性
@observer
export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }
    //click函数调用完后立即结束，这是基于promise的axios，异步执行
    //等待then(),catch()，通过回调函数通知数据已经准备好了
    handleClick(event) {
        event.preventDefault();
        // console.log(event.target);
        // console.log(event.target.form[0]);
        // console.log(event.target.form[1]);
        //click是在button上，要到form上才能取值
        const [email, password] = event.target.form;
        this.props.service.login(email.value, password.value, this);
    }
    render() {
        console.log('login render------------');
        console.log(this.props.service.loggedin);
        if (this.props.service.loggedin) {
            //成功登录后跳转,不准再注册
            return <Redirect to="/" />;
        };
        let em = this.props.service.errMsg;
        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="邮箱" defaultValue="zoes@qq.com" />
                        <input type="password" placeholder="密码" defaultValue={"123456"} />
                        <button onClick={this.handleClick.bind(this)}>登录</button>
                        <p className="message">未注册? <Link to="/reg">请注册</Link></p>

                    </form>
                </div>
            </div>);
    }

    //如果发生错误，消息提示,要放到render函数之后，不然会报错
    //想要起作用，必须在render函数中用一下
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service.errMsg) {
            message.info(
                prevProps.service.errMsg, 5,
                () => prevProps.service.errMsg = ''
            );
        }
    }

}









