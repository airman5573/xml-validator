/*
validator's isValidXML function receives a string, checks if a string is a valid xml, and returns a boolean.

<a /> => true
<a></a> => true
<a>test</a> => true
<a><b></b></a> => true
<a></a><b></b> => true

<a> => false
<<a></a> => false
<a><b></a></b> => false

IMPORTANT: Please note that we have our own internal rules about validity.
1. A node cannot contain a node with the same tag. ex) <a><a></a></a> => false
2. A node cannot be followed by a node with the same tag. ex) <a></a><a></a> => false
3. An xml cannot be more than 2 levels deep. ex) <a><b><c><d></d></c></b></a> => false

IMPORTANT: Feel free to use any open source libraries you find necessary. You can use xml parsing libraries as well.
IMPORTANT: Don't worry about XML declaration, node attributes, or unicode characters.

For further examples, please check basic_spec.js file.

DO NOT MODIFY
*/

/*
@param xmlString: a string, possibly a valid xml string
@return boolean;
*/
const isValidXML = (xmlString) => {
  if (xmlString.length === 0) {
    return false;
  }

  const isValid = (_xmlString, depth) => {
    while(_xmlString.indexOf('<') != -1){
      const openIndex = _xmlString.indexOf('<');
      const closeIndex = _xmlString.indexOf('>');
      const startTag = _xmlString.substring(openIndex, closeIndex + 1);
      const value = startTag.substring(1, startTag.length - 1);
      const endTag = '</'+value+'>';

      // <a><b><c><d></d></c></b></a> -> false (check recursively)
      if (depth > 2) return false;
  
      // <a
      if (closeIndex === -1) return false;
  
      // <>
      if (value.length === 0) return false;

      // <a /> is ok but <a> is not.
      if (startTag.charAt(startTag.length-2) === '/') {
        _xmlString = _xmlString.replace(startTag, '');
        continue // no problem
      } else if (_xmlString.substring(endTag) === -1) {
        return false;
      }
      
      // <<a></a> is false
      if (startTag.charAt(1) === '<') return false;
  
  
      const startTagIndex = _xmlString.indexOf(startTag);
      const endTagIndex = _xmlString.indexOf(endTag);
      const child_XMLString = _xmlString.substring( startTagIndex + startTag.length, endTagIndex );
  
      // <a><a></a></a> | <a><b><a></a></b><a>
      if (child_XMLString.indexOf(startTag) !== -1) return false;
      
      // <a></a><a></a>
      const sibilingTagStartIndex = endTagIndex+endTag.length;
      if (_xmlString.length > sibilingTagStartIndex) {
        if (_xmlString.substring(sibilingTagStartIndex, sibilingTagStartIndex + startTag.length) === startTag) return false;
      }
  
      // <a><b></a></b> -> <b> -> false (check recursively)
      // <a><b><c><d></d></c></b></a> -> false (check recursively)
      if (!isValid(child_XMLString, depth + 1)) return false;

      _xmlString = _xmlString.substring(endTagIndex + endTag.length, _xmlString.length);
    }
    return true;
  }

  return isValid(xmlString, 0);
}

exports.isValidXML = isValidXML;