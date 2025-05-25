//let regex = /[a-zA-Z]{3}/
const text = "astj13";
//console.log(regex.test(text))


let regex = /[a-zA-Z]{4,}/;
//console.log(regex.test(text)); 

const digits = "15a"
regex = /\d/
//console.log(regex.test(digits))

const specialCharacters = "dfasga_dfgsdgadfgadf"
regex = /[^a-zA-Z0-9]/;
//console.log(regex.test(specialCharacters))
