// Задание 3

// Напишите код приложения, интерфейс которого представляет собой input и кнопку.
// В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR
// по URL https://picsum.photos/v2/list?limit=10, где get-параметр limit — это введённое число.
// Пример. Если пользователь ввёл 5, то запрос будет вида: https://picsum.photos/v2/list?limit=5.
// После получения данных вывести ниже картинки на экран.

const inputNumb = document.getElementById("input-numbers");
const btnLoad = document.getElementById("load-img");
const imagesRow = document.getElementById("images-row");

function renderImages(images) {
  imagesRow.innerHTML = "";
  images.forEach((element) => {
    const img = document.createElement("img");
    img.src = element.download_url;
    img.style.width = "500px";
    img.style.marginRight = "50px";
    imagesRow.appendChild(img);
  });
}

btnLoad.addEventListener("click", () => {
  const limit = Number(inputNumb.value);
  if (limit <= 10 && limit >= 1) {
    const URL = `https://picsum.photos/v2/list?limit=${limit}`;
    fetch(URL)
      .then((response) => {
        //   console.log(response);
        //   console.log(response.ok);
        //   console.log(response.status);
        if (response.ok) {
          return response.json();
        }
      })
      .then((images) => {
        renderImages(images);
      })
      .catch((error) => {
        imagesRow.innerHTML = "Error while loading data";
      });
  } else {
    imagesRow.innerHTML = "Number is out of the limit";
  }
});
