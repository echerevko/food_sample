import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
  //Forms

  const forms = document.querySelectorAll(formSelector);

  const message = {
    loading: 'img/form/spinner.svg',
    success: 'thanks, we will contact you soon',
    failure: 'something is wrong...'
  };

  forms.forEach((item) => {
    bindPostData(item);
  });

  function bindPostData(form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement('afterend', statusMessage);

      //1st variant with old style
      // const request = new XMLHttpRequest();
      // request.open('POST', 'server.php');
      // request.setRequestHeader('Content-type', 'application/json');
      //!!!if we create XMLHttpRequest we don`t need set up Header!!!
      const formData = new FormData(form);

      //first way how to turn an object into an array and back
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      //2nd way how to fill array data into object
      // const object = {};
      // formData.forEach(function (value, key) {
      //   object[key] = value;
      // });
      //1st variant - request.send(json);

      //2nd variant when we send post request via fetch api: where?, how?, what?=>>
      postData('http://localhost:3000/requests', json)
        .then((data) => {
          console.log(data);
          showThanksModal(message.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(message.failure);
        })
        .finally(() => {
          form.reset();
        });
      //<<
      // 1st variant =>>
      // request.addEventListener('load', () => {
      //   if (request.status === 200) {
      //     console.log(request.response);
      //     showThanksModal(message.success);
      //     form.reset();
      //     statusMessage.remove();
      //   } else {
      //     showThanksModal(message.failure);
      //   }
      // });
      //<<
    });
  }

  function showThanksModal(message) {
    const prevModalDialog = document.querySelector('.modal__dialog');
    prevModalDialog.classList.add('hide');
    openModal('.modal', modalTimerId);

    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
      <div class="modal__content"> 
        <div class="modal__close" data-close>×</div>
        <div class="modal__title">${message}</div>
      </div>
    `;

    document.querySelector('.modal').append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add('show');
      prevModalDialog.classList.remove('hide');
      closeModal('.modal');
    }, 4000);
  }

  fetch('http://localhost:3000/menu')
    .then((data) => data.json())
    .then((res) => console.log(res));
}
export default forms;
