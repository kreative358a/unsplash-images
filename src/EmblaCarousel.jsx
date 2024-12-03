// import React, { useState, useEffect, useCallback } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import { DotButton, PrevButton, NextButton } from "./EmblaCarouselButtons";
// import "../css/embla.css";
// import ReactDOM from "react-dom";
// import { useQuery } from "react-query";
// import axios from "axios";
// // import "../css/base.css";
// // import "../css/reset.css";

// const EmblaCarousel = ({ children }) => {
//   const [EmblaCarouselReact, embla] = useEmblaCarousel({
//     align: "start",
//     draggable: true,
//     dragFree: false,
//     containScroll: "trimSnaps",
//   });
//   // const [embla, setEmbla] = useState(null);
//   const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
//   const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [scrollSnaps, setScrollSnaps] = useState([]);

//   const scrollTo = useCallback((index) => embla.scrollTo(index), [embla]);
//   const scrollPrev = useCallback(() => embla.scrollPrev(), [embla]);
//   const scrollNext = useCallback(() => embla.scrollNext(), [embla]);

//   useEffect(() => {
//     const onSelect = () => {
//       setSelectedIndex(embla.selectedScrollSnap());
//       setPrevBtnEnabled(embla.canScrollPrev());
//       setNextBtnEnabled(embla.canScrollNext());
//     };
//     if (embla) {
//       setScrollSnaps(embla.scrollSnapList());
//       embla.on("select", onSelect);
//       onSelect();
//     }
//     return () => embla && embla.destroy();
//   }, [embla]);

//   useEffect(() => {
//     if (embla) {
//       embla.reInit({});
//       setScrollSnaps(embla.scrollSnapList());
//     }
//   }, [embla, children]);

//   return (
//     <div className="embla">
//       <EmblaCarouselReact
//         className="embla__viewport"
//         // emblaRef={setEmbla}
//         options={{ loop: false }}
//       >
//         <div className="embla__container">
//           {children.map((Child, index) => (
//             <div className="embla__slide" key={index}>
//               <div className="embla__slide__inner">{Child}</div>
//             </div>
//           ))}
//         </div>
//       </EmblaCarouselReact>
//       <div className="embla__dots">
//         {scrollSnaps.map((snap, index) => (
//           <DotButton
//             selected={index === selectedIndex}
//             onClick={() => scrollTo(index)}
//             key={index}
//           />
//         ))}
//       </div>
//       <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
//       <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
//     </div>
//   );
// };

// function usePosts() {
//   return useQuery("posts", async () => {
//     const { data } = await axios.get(
//       "https://api.unsplash.com/photos/?client_id=gOy8fHKqCXN_JqPwTMZutDnp3aVAmyk-0aXKJCCg7b0&page=1"
//     );
//     // const images = data.map((image) => (
//     //   <img src={image.urls.small} alt={image.alt_description} />
//     // ));
//     // console.log("images ", data);
//     return data;
//   });
// }

// const App = () => {
//   const [slidesLength, setSlidesLength] = useState(1);
//   const { status, data, error, isFetching } = usePosts();

//   useEffect(() => {
//     // setTimeout(() => setAmount(amount + 1), 1000);
//     setSlidesLength(data ? data.length : 5);
//     // setNextBtnEnabled(embla.canScrollNext());
//   }, [data]);

//   return (
//     <>
//       <div className="content">
//         <EmblaCarousel>
//           {Array(slidesLength)
//             .fill(true)
//             .map((index, key) => (
//               <div key={key} />
//             ))}
//         </EmblaCarousel>
//       </div>
//     </>
//   );
// };

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
