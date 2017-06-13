import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import _ from 'lodash';

Meteor.methods({
  // 获取某一个实体，用get
  'test'() {
    return 'hello world';
  },
  reply(text) {
    check(text, String);
    const wrappedHttp = Async.wrap(HTTP, ['post']);
    const res = wrappedHttp.post(
      'http://www.tuling123.com/openapi/api',
      {
        params: {
          key: '3384f71c080595dd5d1eae97fe5a66c3',
          info: text,
        },
      },
    );
    let reply = '';
    if (res && res.statusCode === 200) {
      const content = JSON.parse(res.content);
      reply = content.text;
    }
    return reply;
  },
});
