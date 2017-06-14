import { Meteor } from 'meteor/meteor';
import JsSHA from 'jssha';
import xml from 'node-xml';

WebApp.connectHandlers.use('/hello', (req, res) => {
  const test = Meteor.call('addToTest');
  if (test) {
    res.writeHead(200);
    res.end('SUCCESS');
  }
});

WebApp.connectHandlers.use('/wechat', (req, res) => {
  const token = 'weixin';
  const signature = req.query.signature;
  const timestamp = req.query.timestamp;
  const echostr = req.query.echostr;
  const nonce = req.query.nonce;
  const oriArray = [];
  oriArray[0] = nonce;
  oriArray[1] = timestamp;
  oriArray[2] = token;
  oriArray.sort();
  const original = oriArray.join('');
  const shaObj = new JsSHA(original, 'TEXT');
  const scyptoString = shaObj.getHash('SHA-1', 'HEX');
  if (scyptoString === signature) {
    let postData = '';
    req.on('data', (data) => { postData = data; });
    req.on('end', Meteor.bindEnvironment(() => {
      const xmlStr = postData.toString('utf-8', 0, postData.length);
      console.log(xmlStr);
      // 定义解析存储变量
      let ToUserName = '';
      let FromUserName = '';
      let CreateTime = '';
      let MsgType = '';
      let Content = '';
      let tempName = '';
      // 开始解析消息
      const parse = new xml.SaxParser(Meteor.bindEnvironment((cb) => {
        cb.onStartElementNS((elem, attra, prefix, uri, namespaces) => {
          tempName = elem;
        });
        cb.onCharacters((chars) => {
          const thischars = chars.replace(/(^\s*)|(\s*$)/g, '');
          if (tempName === 'CreateTime') {
            CreateTime = thischars;
          }
        });
        cb.onCdata((cdata) => {
          if (tempName === 'ToUserName') {
            ToUserName = cdata;
          } else if (tempName === 'FromUserName') {
            FromUserName = cdata;
          } else if (tempName === 'MsgType') {
            MsgType = cdata;
          } else if (tempName === 'Content') {
            Content = cdata;
          }
          console.log(tempName, ':', cdata);
        });
        cb.onEndElementNS((elem, prefix, uri) => {
          tempName = '';
        });
        cb.onEndDocument(() => {
          // 按收到的消息格式回复消息
          CreateTime = parseInt(new Date().getTime() / 1000, 10);
          let msg = '';
          if (MsgType === 'text') {
            // msg = `hi,你说的是:${Content}`;
            msg = Meteor.call('reply', Content);
            // 组织返回的数据包
            const sendMessage = `
                <xml>
                  <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
                  <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
                  <CreateTime>${CreateTime}</CreateTime>
                  <MsgType><![CDATA[text]]></MsgType>
                  <Content><![CDATA[${msg}]]></Content>
                </xml>`;
            res.end(sendMessage);
          }
        });
      }));
      parse.parseString(xmlStr);
      res.end(echostr);
    }));
  } else {
    res.end(0);
  }
});
