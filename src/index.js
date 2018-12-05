import React from 'react';
import ReactDom from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from './component/login';
import Reg from './component/reg';
import Home from './component/home';
import About from './component/about';
import Pub from './component/pub';
import L from './component/list';
import Detail from './component/detail';
import { Menu, Icon, Layout } from 'antd';
import 'antd/lib/menu/style';
import 'antd/lib/icon/style';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

const { Header, Content, Footer } = Layout;

class Root extends React.Component {
  render() {
    return (
      <Router>
        <Layout className='layout'>
          <Header>
            <div className='logo'>
              <Menu mode="horizontal">
                <Menu.Item key="home"><Link to="/"><Icon type='home' />主页</Link></Menu.Item>
                <Menu.Item key="login"><Link to="/login"><Icon type='login' />登录</Link></Menu.Item>
                <Menu.Item key="reg"><Link to="/reg"><Icon type='user-add' />注册</Link></Menu.Item>
                <Menu.Item key="pub"><Link to="/pub"><Icon type='export' />发布</Link></Menu.Item>
                <Menu.Item key="list"><Link to="/list"><Icon type='bars' />文章列表</Link></Menu.Item>
                <Menu.Item key="about"><Link to="/about"><Icon type='info' />关于我们</Link></Menu.Item>
              </Menu>
            </div>
          </Header>
          <Content>
            <div style={{ width: '80%', margin: 'auto', padding: '5px', minHeight: 280 }}>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/reg" component={Reg} />
              <Route path="/pub" component={Pub} />
              <Route path="/list" component={L} />
              <Route path="/detail/:id" component={Detail} />
              <Route path="/about" component={About} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Zoes ©2017-2018 Created by Zoes
          </Footer>
        </Layout>
      </Router>
    );
  }
}

ReactDom.render(
  <LocaleProvider locale={zh_CN}><Root /></LocaleProvider>,
  document.getElementById("root")
);

/*如果被Route规则来管，一旦匹配调用了这个可视化组件，就给props里面了塞一个match*/







