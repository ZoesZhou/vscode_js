import React from 'react';
import { observer } from 'mobx-react';
import { injects } from '../utils';
import { postService as service } from '../service/post';
import { Form, Input, Button, Icon } from 'antd';
import { message } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import 'antd/lib/message/style';
import 'antd/lib/form/style';
import 'antd/lib/input/style';
import 'antd/lib/button/style';
import 'antd/lib/icon/style';


const FormItem = Form.Item;
const { TextArea } = Input;

@injects({ service })
@observer
export default class Pub extends React.Component {
    handleSubmit(event) {
        event.preventDefault();
        //event.target解构的title，content是对象
        const [title, content] = event.target;//click是在form上
        this.props.service.pub(title.value, content.value);
    }
    render() {
        let em = this.props.service.msge;
        //如果token为空值，跳转到登录页
        if (this.props.service.loggedin) {
            return <Redirect to="/login" />;
        };
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
        };
        return (
            <Form layout='horizontal' onSubmit={this.handleSubmit.bind(this)} >
                <FormItem {...formItemLayout} label="标题" >
                    <Input placeholder="标题" />
                </FormItem>
                <FormItem {...formItemLayout} label="内容" >
                    <TextArea rows={10} placeholder="内容" />
                </FormItem>
                <FormItem wrapperCol={{ span: 14, offset: 6 }}>
                    <Button type="primary" htmlType="submit">
                        发布
                    </Button>
                </FormItem>
            </Form >
        );
    }
    //渲染后显示消息组件
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.service.msge) {
            message.info(prevProps.service.msge, 5, () => prevProps.service.msge = '');
        }
    }

}















