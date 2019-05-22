export default function replaceAt(content,rid="_"){
  return content.replace(/^(@[^\s\t\n\r]+)\s/,`<a href="#${rid}">$1</a>&nbsp;`)
}