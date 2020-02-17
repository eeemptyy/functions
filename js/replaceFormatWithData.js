/**
 * Replacing nested JavaScript objects template string with json data
 * 
 * @param string format
 * @param object data
 * @param object options
 * @access public 
 * @return string
 */
var replaceFormatWithData = function(format, data, options) {
  /**
   * Extract key from format to map with data later
   * 
   * @param string format 
   * @access private
   * @return array
   */
  let _extract_key_from_format = function(format) {
    stack1 = [];
    stack2 = [];
    cL = 0;
    cR = 0;
    for (i=0; i<format.length; i++){
      val = format[i];
      if (val == '{') {
        cL++;
      } else if (val == '}') {
        cR++;
      }

      if (cL != 0 && cL != cR) {
        stack2.push(val);
      } else if (cL != 0 && cL == cR) {
        stack2.push(val);
        key = stack2.join('');
        if (key.indexOf('|') > -1) {
          key = key.replace(/\|/g,'_');
        }
        stack1.push(key);
        stack2 = [];
        cL = 0;
        cR = 0;
      } else {
        stack1.push(val)
      }
    }
    return stack1;
  };

  /**
   * Map data with ket extracted
   * 
   * @param string format
   * @param object data
   * @access private
   * @return string
   */
  let _replace_key_with_data = function(stack, data) {
    for (i=0; i<stack.length; i++){
      item = stack[i]
      if (item.indexOf('{') <= -1 && item.indexOf('}') <= -1) {
        continue;
      }

      try {
        val = getArrayObjectValueByString(data, item.replace(/[\}\{]/g,''));
        if (val.trim() == '') {
          val = '--';
        }
        stack[i] = val;
      } catch (error) {
        // stack[i] = '--';
      }
    }

    return stack.join('');
  };

  return _replace_key_with_data(_extract_key_from_format(format), data);
}
