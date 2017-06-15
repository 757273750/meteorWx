import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
const Future = require('fibers/future');
import _ from 'lodash';

Meteor.methods({
  // 获取某一个实体，用get
  'test'() {
    return 'hello world';
  },
  'reply'(text) {
    check(text, String);
    const replyFuture = new Future();
    HTTP.post(
      'http://www.tuling123.com/openapi/api',
      {
        params: {
          key: '3384f71c080595dd5d1eae97fe5a66c3',
          info: text,
        },
      },
      (err, res) => {
        let reply = '';
        if (res && res.statusCode === 200) {
          const content = JSON.parse(res.content);
          reply = content.text;
        }
        replyFuture.return(reply);
      }
    );
    return replyFuture.wait();
  },
  'ocr'(url) {
    check(url, String);
    const ocrFuture = new Future();
    HTTP.post(
      'https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/ocr',
      {
        content: '{url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1497556515930&di=75cbd6996f32f89f679f9e4f631655c7&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201404%2F24%2F20140424200528_tvkG3.jpeg"}',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': 'd64a6154ee474f9988078e2469952b5e',
        },
      },
      (err, res) => {
        if (res) {
          ocrFuture.return(res);
        }
      }
    );
    return ocrFuture.wait();
  },
});
