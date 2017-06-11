export const commonBeforeInsert = (userId, doc) => {
  doc.createdAt = doc.createdAt || new Date();
  doc.createdBy = doc.createdBy || userId || 'system';
  doc.modifiedAt = doc.modifiedAt || [];
  doc.modifiedBy = doc.modifiedBy || [];
};

export const commonBeforeUpdate = (userId, doc, fieldNames, modifier) => {
  modifier.$push = modifier.$push || {};
  modifier.$push.modifiedAt = modifier.$push.modifiedAt || new Date();
  modifier.$push.modifiedBy = modifier.$push.modifiedBy || userId || 'system';
};

export const commonBeforeFind = (userId, selector, options) => {
  options.fields = options.fields || { modifiedAt: 0, modifiedBy: 0 };
  options.sort = options.sort || { createdAt: -1 };
  options.skip = options.skip || 0;
  // options.limit = options.limit || 10;
  options.limit = options.limit;
};

export const commonBeforeFindOne = (userId, selector, options) => {
  options.fields = options.fields || { modifiedAt: 0, modifiedBy: 0 };
  options.sort = options.sort || { createdAt: -1 };
};
