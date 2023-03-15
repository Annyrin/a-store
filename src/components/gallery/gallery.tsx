import { useState } from "react";
import { FC } from "react";
import { CustomProducts } from "../../types/products";
import s from "./gallery.module.css";

interface GalleryProps {
  product: CustomProducts;
}

export const Gallery: FC<GalleryProps> = ({ product }) => {
  const [currentImage, setCurrentImage] = useState(product.images[0]);
  const onClick = (img: string) => {
    setCurrentImage(img);
  };

  return (
    <div className={s.container}>
      <img
        src={currentImage}
        alt="Изображение товара"
        className={s.mainImage}
      />
      <div className={s.imgContainer}>
        {product.images.map((img) => (
          <button onClick={() => onClick(img)} className={s.button} key={img}>
            <img
              src={img}
              alt="Альтернативное изображение товара"
              className={s.img}
              data-testid={img}
            />
          </button>
        ))}
      </div>
    </div>
  );
};
