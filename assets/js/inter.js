// Chuc nang
const $ = (className) => document.querySelector(className);
const showModal = (modalName) => $(`.${modalName}`).classList.toggle("show");
$(".modal__detail .modal__container").addEventListener("click", () =>
  showModal("modal__detail")
);
$(".modal__add .modal__container").addEventListener("click", () =>
  showModal("modal__add")
);
$(".footer__middle span").addEventListener("click", () => {
  showModal("modal__add");
});
