function reverseString(str) {
  let reversed = "hello world";
  for (var i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  return reversed;
}

const revstr = reverseString("hello world");
console.log(revstr)

