
// var store = require('store')
// //一定要加载插件，否则key不会过期
// store.addPlugin(require('store/plugins/expire'));

// store.set('user', 'zoes', new Date().getTime() + 10000)

// setInterval(() => console.log(store.get('user', 'enn')), 1000);

// store.set('school', { name: 'zzhh' });
// store.each(function (value, key) {
//     //这里的key，value是相反的
//     console.log(key, '---', value)
// });


// search = '?page=1&size=3&id=a&=abc&id=100'
// search = '?page=1&size=3'

// function parse_qs(qs, re = /(\w+)=\d/) {
//     ret = re.exec(search)
//     console.log(typeof(ret))
//     console.log(ret)
// }


// parse_qs()

// let a = 100;
// let b = 200;
// let c = [1];

// console.log({ a, b, c })



// // 组件原型
// class Reg extends React.Component {
//     render() {
//         return <_Reg service={service} />;
//     }
// }

// //匿名组件
// const Reg = class extends React.Component {
//     render() {
//         return <_Reg service={service} />;
//     }
// }

// //提参数
// function inject(Comp) {
//     return class extends React.Component {
//         render() {
//             return <Comp service={service} />;
//         }
//     }

// }

// //继续提参数
// function inject(service, Comp) {
//     return class extends React.Component {
//         render() {
//             return <Comp service={service} />
//         }
//     }
// }

// //柯里化
// function inject(obj) {
//     function wrapper(Comp) {
//         return class extends React.Component {
//             render() {
//                 return <Comp {...obj} />
//             }
//         }
//     }
//     return wrapper;
// }


// //变形
// function inject(obj) {
//     return function (Comp) {
//         return class extends React.Component {
//             render() {
//                 return <Comp {...obj} />
//             }
//         }
//     }
// }

// //箭头函数简化
// function inject(obj) {
//     return Comp => {
//         return class extends React.Component {
//             render() {
//                 return <Comp {...obj} />;
//             }
//         }
//     }
// }

// //继续简化
// const inject = obj => Comp => {
//     return class extends React.Component {
//         render() {
//             return <Comp {...obj} />;
//         }
//     }
// }

// //无状态组件
// const inject = obj => Comp => {
//     return function (props) {
//         return <Comp {...obj} />;
//     }
// }

// const inject = obj => Comp => props => <Comp {...obj} />;

// //props解构成谁等于谁注入到Comp中
// const inject = obj => Comp => props => <Comp {...obj} {...props} />;






// // 组件原型
// class Reg extends React.Component {
//     render() {
//         return <_Reg service={service} />;
//     }
// }


// const Reg = class extends React.Component {
//     render() {
//         return <_Reg service={service} />;
//     }
// }

// function injects(Comp) {
//     return class extends React.Component {
//         render() {
//             return <Comp service={service} />;
//         }
//     }
// }

// function injects(service, Comp) {
//     return class extends React.Component {
//         render() {
//             return <Comp {...service} />;
//         }
//     }
// }

// function injects(obj) {
//     function wrapper(Comp) {
//         return class extends React.Component {
//             render() {
//                 return <Comp {...obj} />;
//             }
//         }
//     }
// }

// function injects(obj) {
//     return function (Comp) {
//         return class extends React.Component {
//             render() {
//                 return <Comp {...obj} />;
//             }
//         }
//     }
// }

// const injects = obj => Comp =>
//     class extends React.Component {
//         render() {
//             return <Comp {...obj} />;
//         }
//     }


// const injects = obj => Comp =>
//     function (props) {
//         return <Comp {...obj} />;
//     }

// const injects = obj => Comp => props => <Comp {...obj} {...props} />;


let search = '?page=1&size=3&id=&a&&=abc&id=100&city=北京'
// re = /(\w+)=(\d+)/ //没有汉字
function parse_qs(qs, re = /([^=?]+)=([^$?]+)/) {
    let obj = {}
    // if (qs.startsWith('?')) 
    //     qs = qs.substr(1);
    qs.split('&').forEach(element => {
        match = re.exec(element);
        if (match) {
            console.log(match);
            obj[match[1]] = match[2]
        }

    });
    return obj;
}

parse_qs(search)









