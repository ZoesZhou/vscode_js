import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../css/login.css';
import { userService as service } from '../service/user';
import { observer, inject } from 'mobx-react';
import { message } from 'antd';
import 'antd/lib/message/style';
import { injects } from '../utils';

// export default class Reg extends React.Component {
//     render() {
//         return <_Reg service={service} />;
//     }
// }

@injects({service})//解构成service={service}
@observer
export default class Reg extends React.Component {
    constructor(props) {
        super(props);
    }
    validatePwd(pw1, pw2) {
        return pw1.value === pw2.value;
    }

    handleClick(event) {
        event.preventDefault();
        const [email, name, password, confirm] = event.target.form;//指button
        console.log(email);
        console.log(name);
        console.log(password);
        console.log(confirm);
        console.log(this.validatePwd(password, confirm))
        if (this.validatePwd(password, confirm)) {
            //email,name,password现在是组件
            let flag = 'true';
            this.props.service.reg(email.value, name.value, password.value, flag)
        }

        else {
            let flag = 'false';
            this.props.service.reg(flag)
            console.log('error--------------------------')
            console.log(this.props.service.errMsg, '222222222222')
        }
    }

    render() {
        console.log(this.props.service.loggedin, 'reg render=====')
        //已经登录的用户不允许注册
        console.log(this.props.service.errMsg, '222222222222')
        if (this.props.service.loggedin) {
            return <Redirect to='/' />;
        }
        let em = this.props.service.errMsg;
        return (
            <div className="login-page">
                <div className="form">
                    <form className="register-form">
                        <input type="text" placeholder="邮箱" />
                        <input type="text" placeholder="用户名" />
                        <input type="password" placeholder="密码" />
                        <input type="password" placeholder="确认密码" />
                        <button onClick={this.handleClick.bind(this)}>注册</button>
                        <p className="message">已注册<Link to="/login">请登录</Link></p>

                    </form>
                </div>
            </div>);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service.errMsg) {
            message.info(prevProps.service.errMsg, 5,
                () => prevProps.service.errMsg = '');
        }
    }
}

