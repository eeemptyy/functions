/**
 * Date Picker Validation
 * 
 * @param object input 
 * @access public
 * @return boolean
 */
function datePickerValidation(input) {
  let _dat = $(input).val();

  let _is_valid = true;
  if ((_dat.match(/\//g) || []).length != 2) {
    _is_valid = false;
  }

  if (_is_valid) {
    _is_valid = moment(_dat.split('/').reverse().join('-')).isValid();
  }

  return _is_valid;
}
