import { Meteor } from 'meteor/meteor';

Meteor.methods({
  // 获取某一个实体，用get
  'test'() {
    return 'hello world';
  },
});
