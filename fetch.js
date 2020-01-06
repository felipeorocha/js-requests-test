const getButton = document.querySelector('button[id="get-button"]');
const postButton = document.querySelector('button[id="post-button"]');
const ulElement = document.querySelector('#unordered-list-container ul');

const elementCreator = (el, content) => {
  const element = document.createElement(`${el}`);
  const elementContent = document.createTextNode(content);
  element.appendChild(elementContent);
  ulElement.appendChild(element);
}

const sendHttRequest = async (url, method, data) => {
  const response = await fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: data ? { 'Content-Type': 'application/json' } : {}
  });
  const resData = await response.json();
  return resData;
}

const getData = () => {
  sendHttRequest('https://reqres.in/api/users', 'GET')
  .then(resData => resData.data
    .map(item => elementCreator('li', item.email)));
}

const sendData = () => {
  sendHttRequest('https://reqres.in/api/register', 'POST', {
    email: 'test@hotmail.com',
    password: 'test'
  })
}

getButton.onclick = getData;
postButton.onclick = sendData;
