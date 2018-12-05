import React from 'react';
import { observer } from 'mobx-react';
import { injects, parse_qs } from '../utils';
import { postService as service } from '../service/post';
import { message, List } from 'antd';
import { Link, Redirect } from 'react-router-dom';
import 'antd/lib/message/style';
import 'antd/lib/list/style';


@injects({ service })
@observer
export default class L extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        //在render函数之前，向后台发起请求，获取列表
        //不处理查询字符串，传到后端处理
        props.service.list(props.location.search);//page=2&size=10
    }

    handleChange(page, pageSize) {
        console.log(page);//未来的当前页，当前点击的页码
        console.log(pageSize)
        console.log('***********************')
        //查询成功后，会注入到posts，pagination中
        this.props.service.list(`?page=${page}&size=${pageSize}`)
    }

    handleItemRender(page, type, originalElement) {
        console.log('itemRender`````````````````````````');
        const { size = 20 } = parse_qs(this.props.location.search);
        if (page === 0) return originalElement;
        if (type === 'page') {
            return (
                <Link to={'/list?page=' + page + '&size=' + size}>{page}</Link>
            );
        }
        if (type === 'prev') {
            console.log('%%%%%%%', page, type)
            // return originalElement;
            return (
                <Link to={
                    '/list?page=' + page + '&size=' + size
                } className="ant-pagination-item">&lt;</Link>
            );
        }
        if (type === 'next') {
            console.log('%%%%%%%', page, type)
            // return originalElement;
            return (
                <Link to={
                    '/list?page=' + page + '&size=' + size
                } className="ant-pagination-item">&gt;</Link>
            );
        }
        // return originalElement;
    }

    render() {
        const data = this.props.service.posts;
        if (data.length) {
            const {
                page: current = 1,
                size: pageSize = 20,
                count: total = 0
            } = this.props.service.pagination;
            return (
                <List
                    header={<div>博客列表</div>}
                    bordered
                    dataSource={data}
                    //遍历列表元素 
                    renderItem={item => (
                        <List.Item>
                            <Link to={'/detail/' + item.post_id}>{item.title}</Link>
                        </List.Item>
                    )}
                    pagination={{
                        current: current,
                        pageSize: pageSize,
                        total: total,
                        onChange: this.handleChange.bind(this),
                        itemRender: this.handleItemRender.bind(this)
                    }}
                />);
        } else {
            return (<div>无数据</div>);
        }
    }
}


