//props解构成谁等于谁注入到Comp中
import React from 'react';

const injects = obj => Comp => props => <Comp {...obj} {...props} />;


function parse_qs(qs, re = /([^=?]+)=([^$?]+)/) {
    let obj = {}
    // if (qs.startsWith('?')) 
    //     qs = qs.substr(1);
    qs.split('&').forEach(element => {
        let match = re.exec(element);
        if (match) {
            console.log(match);
            obj[match[1]] = match[2]
        }

    });
    return obj;
}

export { injects, parse_qs };