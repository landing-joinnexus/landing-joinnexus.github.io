import Slide1 from "assets/images/mockups/slide-1.webp";
import Slide2 from "assets/images/mockups/slide-2.webp";
import Slide3 from "assets/images/mockups/slide-3.webp";
import Slide4 from "assets/images/mockups/slide-4.webp";
import Slide5 from "assets/images/mockups/slide-5.webp";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import OwlCarousel from "react-owl-carousel";
import Styles from "./index.module.css";

const slides = [Slide1, Slide2, Slide3, Slide4, Slide5];

export const Carousel = () => {
  return (
    <OwlCarousel
      dots={true}
      className="owl-theme"
      items={1}
      margin={10}
      nav={true}
    >
      {slides.map((image, index) => (
        <div className={Styles.container} key={index}>
          <div className={Styles.slideContainer}>
            <img alt={`slide-${index}`} src={image} className={`${Styles.slide} item`} />
          </div>
        </div>
      ))}
    </OwlCarousel>
  );
};
