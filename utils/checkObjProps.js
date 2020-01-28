const checkObjProps = (obj,checkRules)=> {
  const error = [];
  for (rule of checkRules) {
    if (!obj[rule.prop]) {
      if (rule.required) {
        error.push(`missing required field : "${rule.prop}"`);
      }
      continue;
    }
    const val = obj['prop'];
    if (!rule.type) {
      continue;
    }

    if (rule.type === 'integer') {
      if (Math.floor(parseInt(val)) !== val) {
        error.push(`expected type : "${rule.type}" for field : "${rule.prop}"`);
      } else if (typeof val !== rule.prop) {
        error.push(`expected type : "${rule.type}" for field : "${rule.prop}"`);
      }
    }
  }

  return error ? {error} : {valid : true};
};

module.exports = checkObjProps;