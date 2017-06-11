import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Mongo } from 'meteor/mongo';
import _ from 'lodash';

Meteor.methods({
  // 获取某一个实体，用get
  'test'() {
    return 'hello world';
  },
});
