import { Meteor } from 'meteor/meteor';
import JsSHA from 'jssha';
// import xml from 'node-xml';
import xml2js from 'xml2js';

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
      xml2js.parseString(xmlStr, (err, result) => {
        console.log(result);
        const xml = result.xml;
        ToUserName = xml.ToUserName[0];
        FromUserName = xml.FromUserName[0];
        CreateTime = xml.CreateTime[0];
        MsgType = xml.MsgType[0];
        if (MsgType === 'text') {
          Content = xml.Content[0];
        }
        if (MsgType === 'voice') { // 判断语音
          Content = xml.Recognition[0];
        }
        const msg = Meteor.call('reply', Content);
        const sendMessage = `
            <xml>
              <ToUserName><![CDATA[${FromUserName}]]></ToUserName>
              <FromUserName><![CDATA[${ToUserName}]]></FromUserName>
              <CreateTime>${CreateTime}</CreateTime>
              <MsgType><![CDATA[text]]></MsgType>
              <Content><![CDATA[${msg}]]></Content>
            </xml>`;
        res.end(sendMessage);
      });
      res.end(echostr);
    }));
  } else {
    res.end(0);
  }
});
