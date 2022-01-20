import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

// Создаём массив для разметки

const galleryMarkup = [];

// Контейнер галлереи

const galleryContainer = document.querySelector(".gallery");

// Создаём каточки

for (let i = 0; i < galleryItems.length; i += 1) {
  // Создаём контейнер галереи

  const div = document.createElement("div");
  div.classList.add("gallery__item");

  // Создаём ссылку

  const link = document.createElement("a");
  link.classList.add("gallery__link");
  link.href = galleryItems[i].original;

  // Создаём изображение

  const img = document.createElement("img");
  img.src = galleryItems[i].preview;
  img.classList.add("gallery__image");
  img.dataset.source = galleryItems[i].original;
  img.alt = galleryItems[i].description;

  // Добавляем изображение в ссылку

  link.append(img);

  // Добавляем ссылку в контейнер

  div.append(link);

  // Добавляем контейнер в массив для разметки

  galleryMarkup.push(div);
}

// Вставляем контейнер в HTML

galleryContainer.append(...galleryMarkup);

// Вешаем слушатель для галлереи

galleryContainer.addEventListener("click", onClickGalleryImageOpen);

// Слушатель клика по изображению

function onClickGalleryImageOpen(event) {
  const { target } = event;
  const isTargetImage = target.classList.contains("gallery__image");

  if (isTargetImage) {
    event.preventDefault();

    let isModalOpen = false;

    const instance = basicLightbox.create(
      `
         <img src="${event.target.dataset.source}" width="800" height="600">
      `,
      { onClose: () => document.removeEventListener("keyup", closeModal) }
    );

    isModalOpen = instance.show();

    if (isModalOpen) {
      document.addEventListener("keyup", closeModal);
    }

    // Закрытие модалки по Esc

    function closeModal(event) {
      if (event.key === "Escape") {
        instance.close();
      }
    }
  }
}
