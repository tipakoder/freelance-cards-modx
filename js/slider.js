/**
 * Функция создающая слайдер на основе параметров
 * @param id
 * @param images
 * @constructor
 */
const Slider = (
    {
        id,
        images,
        slider_arrow_left,
        slider_arrow_right
    }
) => {
    const slider_object = document.getElementById(id);
    const slider_images = [];
    let current_image = 0;

    // Создаём объекты слайдера
    slider_object.classList.add("slider-wrapper");
    const slider_view_object = document.createElement("div");
    slider_view_object.className = "slider-view-object";
    const slider_view_img = document.createElement("img");
    slider_view_img.className = "slider-view-img";
    slider_view_img.src = images[current_image];
    slider_view_object.appendChild(slider_view_img);
    slider_object.appendChild(slider_view_object);

    // Функция смены текущего изображения
    const change_current_image = index => {
        current_image = index;

        for(let img of slider_images) {
            img.classList.remove("current-image");
        }

        slider_images[current_image].classList.add("current-image");
        slider_view_img.src = images[current_image];
    }

    // Следующее изображение
    const next_image = () => {
        if((current_image + 1) >= images.length) {
            current_image = 0;
        } else {
            current_image += 1;
        }
        change_current_image(current_image);
    }

    // Предыдущее изображение
    const back_image = () => {
        if((current_image - 1) < 0) {
            current_image = (images.length - 1);
        } else {
            current_image -= 1;
        }
        change_current_image(current_image);
    }

    // Стрелочки влево и вправо
    let bufferElement = document.createElement("div");
    bufferElement.innerHTML += slider_arrow_left;
    bufferElement.innerHTML += slider_arrow_right;
    const slider_view_arrow_left = bufferElement.children[0];
    const slider_view_arrow_right = bufferElement.children[1];
    slider_view_arrow_left.classList.add("slider-view-arrow");
    slider_view_arrow_left.classList.add("slider-view-arrow-left");
    slider_view_arrow_right.classList.add("slider-view-arrow");
    slider_view_arrow_right.classList.add("slider-view-arrow-right");
    slider_view_arrow_left.addEventListener("click", back_image);
    slider_view_arrow_right.addEventListener("click", next_image);
    slider_view_object.appendChild(slider_view_arrow_left);
    slider_view_object.appendChild(slider_view_arrow_right);

    const slider_preview_object = document.createElement("div");
    slider_preview_object.className = "slider-preview-wrapper";
    for(let img of images) {
        let slider_image = document.createElement("div");
        slider_image.className = "slider-preview-img";
        slider_image.style.backgroundImage = `url(${img})`;
        slider_images.push(slider_image);

        const slider_image_index = slider_images.indexOf(slider_image);
        slider_image.addEventListener("click", () => {
            change_current_image(slider_image_index);
        });

        slider_preview_object.appendChild(slider_image);
    }
    slider_object.appendChild(slider_preview_object);

    change_current_image(0);
}