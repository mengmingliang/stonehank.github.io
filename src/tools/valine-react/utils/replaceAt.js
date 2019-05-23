export default function replaceAt(content,rid="_"){
  return content.replace(/^(@[^\s\t\n\r]+)\s/,`<a class="at" href="#${rid}">$1</a>&nbsp;`)
}