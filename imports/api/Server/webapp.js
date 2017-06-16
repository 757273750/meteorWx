import { Meteor } from 'meteor/meteor';
import Crypto from 'crypto';

WebApp.connectHandlers.use('/hello', (req, res) => {
  const test = Meteor.call('test');
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
  const scyptoString = Crypto.createHash('sha1').update(original).digest('hex');
  if (scyptoString === signature) {
    res.end(echostr);
  } else {
    res.end(0);
  }
});
