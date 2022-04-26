// const copy: (txt: string) => void = debounce((txt: string) => {
//   let oInput: HTMLTextAreaElement = document.querySelector('#_copy-check_')

//   if (!oInput) {
//     oInput = document.createElement('textarea')
//     oInput.id = '_copy-check_'
//     oInput.className = 'oInput'
//     document.body.appendChild(oInput)
//   } else {
//     oInput.style.display = 'inline-block'
//   }

//   oInput.value = txt
//   oInput.select()
//   document.execCommand('Copy')

//   oInput.style.display = 'none'

//   Dialog.success('复制成功')
// }, 300)

class Student{
  fullname: string
  constructor(public firstName, public middleName, public lastName) {
    this.fullname = this.fullname +'-'+middleName +'-'+lastName
  }
}

interface Person{
  firstName: string,
  lastName: string
}

function greeter(person : Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Jane", "M.", "User");

document.body.innerHTML = greeter(user);

export default Student