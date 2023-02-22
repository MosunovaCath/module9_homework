// Задание 5.

// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число из первого input, а GET-параметр limit — это введённое число второго input.
// Пример. Если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
// После получения данных вывести список картинок на экран.

// Если пользователь перезагрузил страницу, то ему должны показываться картинки из
// последнего успешно выполненного запроса (использовать localStorage).

const pageInput = document.getElementById("page-input");
const limitInput = document.getElementById("limit-input");
const requestBtn = document.getElementById("request-btn");
const imgRow = document.getElementById("img-row");

let savedPage = localStorage.getItem("savedPage") || "";
let savedLimit = localStorage.getItem("savedLimit") || "";

if (savedPage != "" && savedLimit != "") {
  pageInput.value = savedPage;
  limitInput.value = savedLimit;
}

function validateNumber(input) {
  if (isNaN(input) || input < 1 || input > 10) {
    return false;
  }
  return true;
}

function renderImages(data) {
  imgRow.innerHTML = "";
  data.forEach((element) => {
    const img = document.createElement("img");
    img.src = element.download_url;
    img.style.width = "500px";
    img.style.marginRight = "50px";
    imgRow.appendChild(img);
  });
}

function sentRequest() {
  const page = pageInput.value;
  const limit = limitInput.value;
  if (!validateNumber(page) && !validateNumber(limit)) {
    imgRow.innerHTML = " All data is incorrect";
    return;
  }
  if (!validateNumber(page)) {
    imgRow.innerHTML = " Page data is incorrect";
    return;
  }
  if (!validateNumber(limit)) {
    imgRow.innerHTML = " Limit data is incorrect";
    return;
  }
  const URL = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      renderImages(data);
      localStorage.setItem("savedPage", page);
      localStorage.setItem("savedLimit", limit);
    })
    .catch((error) => {
      imgRow.innerHTML = "Error while loading data";
    });
}

requestBtn.addEventListener("click", sentRequest);

if (savedPage != "" && savedLimit != "") {
  sentRequest();
} else {
  console.log("empty localstorage");
}
