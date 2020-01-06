const getButton = document.querySelector('button[id="get-button"]');
const postButton = document.querySelector('button[id="post-button"]');

const sendHttRequest = (method, url, data) => {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.responseType = 'json';
    if (data) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
    // xhr.onreadystatechange = function() { //disparado se o atributo readyState mudou de valor, exceto quando muda para
    xhr.onload = () => { // disparado quando a requisicao foi um sucesso (nao e suportado por todos os borwsers)
      // if (xhr.readyState == 4 && xhr.status == 200) {
        // console.log(JSON.parse(xhr.responseText));
        // resolve(JSON.parse(xhr.response));
        console.log(xhr.response);
        resolve(xhr.response);
      // }
    }
    xhr.onerror = () => { // disparado se a requisicao falhar
      reject('error...');
    }
    xhr.send(JSON.stringify(data));
  });
  return promise;
}

const getData = () => {
  sendHttRequest('GET', 'https://reqres.in/api/users')
  .then(response => console.log(response));
}
const sendData = () => {
  sendHttRequest('POST', 'https://reqres.in/api/register', {
    email: 'teste@gmail.com',
    password: 'dontknow'
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.log(err);
  });
}

// getButton.addEventListener('click', getData);

getButton.onclick = getData;
postButton.onclick = sendData;
