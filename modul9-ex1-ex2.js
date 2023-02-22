// Задание 1. Модуль 9.
// Вам дана заготовка и результат, который вы должны получить.
// Ваша задача — написать код,
// который будет преобразовывать XML в JS-объект и выводить его в консоль.

const xml = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`;

const parser = new DOMParser();
const xmlDoc = parser.parseFromString(xml, "text/xml");
console.log(xmlDoc);
const students = Array.from(xmlDoc.getElementsByTagName("student")).map(
  (student) => {
    console.log(student);
    const nameNode = student.getElementsByTagName("name")[0];
    const firstName = nameNode.getElementsByTagName("first")[0].textContent;
    const lastName = nameNode.getElementsByTagName("second")[0].textContent;
    const name = firstName + lastName;
    return {
      name,
      age: Number(student.getElementsByTagName("age")[0].textContent),
      prof: student.getElementsByTagName("prof")[0].textContent,
      lang: nameNode.getAttribute("lang"),
    };
  }
);

const output = { list: students };
console.log(output);

// Задание 2.

// Вам дана заготовка и результат, который вы должны получить.
// Ваша задача — написать код,
// который будет преобразовывать JSON в JS-объект и выводить его в консоль.

const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;
const data = JSON.parse(jsonString);
console.log(data);
