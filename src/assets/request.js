// 1 Переделайте makeGETRequest() так, чтобы она использовала промисы.
const API_URL = 'https://raw.githubusercontent.com/MarinaVolkova/db/main/';

export function makeGETRequest(url, callback) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${API_URL}${url}`);
    xhr.addEventListener('load', () => {
      xhr.status === 200
        ? resolve(callback(xhr.responseText))
        : reject(`Ошибка: [${xhr.status}] ${xhr.responseText}`)
    });
    xhr.addEventListener('error', () => reject('Сетевая ошибка'))

    xhr.send();
  });
}


