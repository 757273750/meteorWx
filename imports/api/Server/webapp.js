import { Meteor } from 'meteor/meteor';
import JsSHA from 'jssha';

WebApp.connectHandlers.use('/hello', (req, res) => {
  const test = Meteor.call('test');
  if (test) {
    res.writeHead(200);
    res.end('SUCCESS');
  }
});
