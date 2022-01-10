import { getResources } from '../services/services';

function cards() {
  //Cards classes

  class MenuCard {
    constructor(src, alt, title, description, price, parentSelector) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.usdToSek = 9;
      this.changeToSek();
    }

    changeToSek() {
      this.price = this.price * this.usdToSek;
    }

    render() {
      const element = document.createElement('div');
      element.innerHTML = `
        <div class="menu__item">
          <img src=${this.src} alt=${this.alt}>
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">${this.description}</div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
              <div class="menu__item-cost">Price:</div>
              <div class="menu__item-total"><span>${this.price}</span> sek/day</div>
          </div>
        </div>
      `;
      this.parent.append(element);
    }
  }
  // 1st variant how to create cards
  // const div = new MenuCard(.......);
  // div.render();  or

  //get request with FETCH API

  getResources('http://localhost:3000/menu').then((data) => {
    data.forEach(({ img, altimg, title, descr, price }) => {
      new MenuCard(
        img,
        altimg,
        title,
        descr,
        price,
        '.menu .container'
      ).render();
    });
  });

  //get request with AXIOS
  // axios.get('http://localhost:3000/menu').then((data) => {
  //   data.data.forEach(({ img, altimg, title, descr, price }) => {
  //     new MenuCard(
  //       img,
  //       altimg,
  //       title,
  //       descr,
  //       price,
  //       '.menu .container'
  //     ).render();
  //   });
  // });

  // 2nd dinamic method how to create cards
  // getResources('http://localhost:3000/menu').then((data) => createCard(data));
  // function createCard(data) {
  //   data.forEach(({ img, altimg, title, descr, price }) => {
  //     const element = document.createElement('div');
  //     element.classList.add('menu_item');
  //     element.innerHTML = ` <div class="menu__item">
  //         <img src=${img} alt=${altimg}>
  //         <h3 class="menu__item-subtitle">${title}</h3>
  //         <div class="menu__item-descr">${descr}</div>
  //         <div class="menu__item-divider"></div>
  //         <div class="menu__item-price">
  //             <div class="menu__item-cost">Price:</div>
  //             <div class="menu__item-total"><span>${price}</span> sek/day</div>
  //         </div>
  //       </div>
  //     `;
  //     document.querySelector('.menu .container').append(element);
  //   });
  // }
}
export default cards;
