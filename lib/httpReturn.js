/**
 * file : libs/httpReturn.js
 * name : sanyer
 * describe : http返回码
 * time : 2019-05-28
 */

var res = {
    success: (data, msg) => {
        let r = null;
        if (data == undefined || data == null) {
            r = {
                code: 1,
                msg: (msg == undefined || msg == null || msg == '') ? '操作成功' : msg
            }
        } else {
            r = {
                code: 1,
                msg: (msg == undefined || msg == null || msg == '') ? '操作成功' : msg,
                data: data
            }
        }
        return r;
    },
    error: (msg) => {
        let r = {
            code: 0,
            msg: (msg == undefined || msg == null || msg == '') ? '操作失败' : msg,
        }
        return r;
    },
    success1: {
        code: 1,
        msg: '操作成功'
    },
    successOK: {
        code: 1,
        msg: 'ok'
    },
    error0: {
        code: 0,
        msg: '操作失败'
    },
    loginError: {
        code: -1,
        msg: '用户名或密码错误'
    },
    appkeyError: {
        code: -2,
        msg: 'appkey验证有误'
    },
    appkeyExpire: {
        code: -3,
        msg: 'appkey已过期'
    },
    appkeyEmpty: {
        code: -4,
        msg: 'appkey不能为空'
    },
    appkeyVerif: {
        code: -5,
        msg: 'appkey未能通过验证'
    },
    paramEmpty: {
        code: -6,
        msg: '参数不能为空'
    },
    codeEmpty: {
        code: -7,
        msg: '机器码不能为空'
    },
    codeNoth: {
        code: -8,
        msg: '机器码不存在'
    },
    signErr: {
        code: -9,
        msg: '签名有误'
    },
    secretEmpty: {
        code: -10,
        msg: '秘钥不能为空'
    },
    signkeyErr: {
        code: -11,
        msg: '签名或登录key有误'
    },
    serverError: {
        code: -100,
        msg: '未找到相关服务或运行错误'
    },
    roleError: {
        code: -101,
        msg: '当前用户没有权限访问'
    },
    illegalError: {
        code: -102,
        msg: '非法访问'
    },
    runError: {
        code: -103,
        msg: '运行错误，请查看参数是否正确'
    },
    notOnline: {
        code: -200,
        msg: '客户端或终端不在线'
    },
    operatesuccess: function (data, msg) {
        let res = {
            code: 200,
            msg: ('' === msg || undefined === msg || null === msg) ? '操作成功' : msg,
            data: ('' == data || undefined === data || null === data) ? null : data
        }
        return res;
    },
    operateerror: function (data, msg) {
        let res = {
            code: 500,
            msg: ('' == msg || undefined === msg || null === msg) ? '操作失败' : msg,
            data: ('' === data || undefined == data || null === data) ? null : data
        }
        return res;
    }
}

exports.res = res;