const fs = require('fs-extra');
const klaw = require('klaw');
const path = require('path');

const templateTag = 'build';
 
const processFile = function (item) {
  if (!item.stats.isDirectory()) {
    var filePath = path.relative('src', item.path);
    if (path.extname(item.path) === '.html') {
 
        fs.outputFileSync('dist/' + filePath, applyTemplate(item.path));
        console.log(filePath + ' copied and template applied');
    } else {
        fs.copySync(item.path, 'dist/' + path.relative('src', item.path));      
        console.log(filePath + ' copied');
    }
  }
};


var template = fs.readFileSync('template.html').toString();
var templateRegex = new RegExp('<!--\\s*' + templateTag + ':([^\\s]+)\\s*-->', 'g');
fs.emptyDirSync('dist');
klaw('src')
  .on('data', processFile)
  .on('end', () => console.log("done"))


function applyTemplate(filePath) {
        var content = fs.readFileSync(filePath).toString();
        var mergedContent = template.replace(templateRegex, function (match, templateTagName) {
            var find = content.match(generateContentRegex(templateTagName));
            return find ? find[1] : match;
        } )
    return mergedContent;
}

function generateContentRegex(templateTagName) {
  return new RegExp(
    '<!--\\s*' + templateTag + ':' + templateTagName + '\\s*-->' +
    '((.|[\\r\\n])+)' +
    '<!--\\s*\\/' + templateTag + ':' + templateTagName + '\\s*-->'
  );
}