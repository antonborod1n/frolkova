document.addEventListener('DOMContentLoaded', function () {
  const burgerMenu = document.querySelector('.burger-menu');
  const menu = document.querySelector('.menu');

  burgerMenu.addEventListener('click', function () {
    menu.classList.toggle('active');
  });

  //Модальное окно
  function modal() {
    const btn = document.querySelectorAll('.js-modal');
    const btn1 = document.querySelectorAll('.js-modal1');
    const modal = document.querySelector('.popup');
    const modal2 = document.querySelector('.popup2');
    const close = document.querySelectorAll('.popup__close');
    const inputIntr = document.querySelector('.popup__input-intr');
    const popupBtnBox = document.querySelector('.popup__btn-box');
    const policy = document.querySelector('.footer__link-policy');
    const dataBtn = document.querySelector('.popup__data');
    const popupPolicy = document.querySelector('.popup__policy');
    const popupSogl = document.querySelector('.popup__sogl');

    policy.addEventListener('click', function () {
      popupPolicy.classList.add('active');
    });

    dataBtn.addEventListener('click', function () {
      popupSogl.classList.add('active');
    });

    btn.forEach((item) => {
      item.addEventListener('click', function () {
        modal.classList.add('active');
      });
    });

    btn1.forEach((item) => {
      item.addEventListener('click', function () {
        modal2.classList.add('active');
      });
    });

    close.forEach((item) => {
      item.addEventListener('click', function () {
        modal2.classList.remove('active');
        popupPolicy.classList.remove('active');
        popupSogl.classList.remove('active');
      });
    });

    modal2.addEventListener('click', function (e) {
      if (e.target === modal2) {
        modal2.classList.remove('active');
      }
    });

    popupPolicy.addEventListener('click', function (e) {
      if (e.target === popupPolicy) {
        popupPolicy.classList.remove('active');
      }
    });

    popupSogl.addEventListener('click', function (e) {
      if (e.target === popupSogl) {
        popupSogl.classList.remove('active');
      }
    });
  }

  modal();

  const formsOrder = () => {
    const popup2 = document.querySelector('.popup2');
    const form2 = popup2.querySelector('.popup__form');
    const inputs = document.querySelectorAll('.popup__input');

    const message = {
      success: `<div class="popup__inner">
      <button class="popup__close">
      <svg viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M48.175 41L62.2688 26.9062C64.3188 24.8562 64.3188 21.7812 62.2688 19.7312C61.5 18.7062 60.2188 17.9375 58.9375 17.9375C57.6563 17.9375 56.375 18.45 55.35 19.475L41 33.825L26.9063 19.7312C24.8563 17.6812 21.525 17.6812 19.7312 19.7312C18.7062 20.5 17.9375 21.7813 17.9375 23.3188C17.9375 24.8563 18.45 25.8812 19.475 26.9062L33.5688 41L19.475 55.0938C18.7062 56.1188 17.9375 57.4 17.9375 58.9375C17.9375 60.2188 18.45 61.5 19.475 62.525C20.5 63.55 21.7813 64.0625 23.0625 64.0625C24.3438 64.0625 25.625 63.55 26.65 62.525L40.7438 48.4312L54.8375 62.525C56.8875 64.575 60.2188 64.575 62.0125 62.525C64.0625 60.475 64.0625 57.1437 62.0125 55.35L48.175 41Z"
          fill="#D0CCCC"
        />
      </svg>
    </button>
        <div class="popup__title-done">
          <div>«Благодарю за доверие!</div> 
          <div>ближайшее время я свяжусь с Вами для уточнения параметров.</div>
          <div>Ваш эксперт <span>Елена</span>»</div>
          </div>
        <button class="popup__btn popup__btn-prev popup__close">Вернуться на главную</button>
      </div>`,
      failure: 'Что-то пошло не так...',
    };

    const closeSuccessModal = () => {
      const modal = document.querySelector('.popup2');
      const closeBtns = document.querySelectorAll('.popup__close');

      closeBtns.forEach((item) => {
        item.addEventListener('click', function () {
          modal.classList.remove('active');
        });
      });
    };

    const postData = async (url, data) => {
      let res = await fetch(url, {
        method: 'POST',
        body: data,
      });

      return await res.text();
    };

    const clearInputs = () => {
      inputs.forEach((item) => (item.value = ''));
    };

    form2.addEventListener('submit', (e) => {
      e.preventDefault();

      let statusMessage = document.createElement('div');
      statusMessage.classList.add('status');
      form2.appendChild(statusMessage);

      const formData = new FormData(form2);

      postData('./mail.php', formData)
        .then((res) => {
          popup2.innerHTML = message.success;
          closeSuccessModal();
        })
        .catch(() => (statusMessage.textContent = message.failure))
        .finally(() => {
          clearInputs();
          setTimeout(() => {
            statusMessage.remove();
          }, 5000);
        });
    });
  };

  formsOrder();
});
