import { Meteor } from 'meteor/meteor';
import JsSHA from 'jssha';

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
    console.log(req);
    res.end(echostr);
  } else {
    res.end(0);
  }
});
