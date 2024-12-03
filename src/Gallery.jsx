import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
// import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import "./fullscreen.css";
import { ImageGroup, Image } from "react-fullscreen-image";
import { SRLWrapper } from "simple-react-lightbox";
import SimpleReactLightbox from "simple-react-lightbox";

// const url = `https://api.unsplash.com/search/photos?client_id=${
//   import.meta.env.VITE_API_KEY
// }`;
// https://unsplash.com/documentation#search-photos
// 672730
// AGDv1AKz5PVGE17gu2sAf3-pEvukMPubWkKufxJfiZM
// c2RDz0J7V8jfqBV71tF89Fks_v6Ae8Gyxzgz0iuEs6M
// ${import.meta.env.VITE_API_KEY}`

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

// const url =
//   "https://api.unsplash.com/search/photos?client_id=AGDv1AKz5PVGE17gu2sAf3-pEvukMPubWkKufxJfiZM&page=1&per_page=12";

// div.ReactGridGallery_tile-viewport > img
// body > div.ReactModalPortal > div > div > div > div.ril-inner.ril__inner > img.ril-image-current.ril__image

const Gallery = () => {
  const { searchTerm, searchPage } = useGlobalContext();
  const response = useQuery({
    // queryKey: ["images"],
    queryKey: ["images", searchTerm, searchPage],
    queryFn: async () => {
      const result = await axios.get(
        `${url}&query=${searchTerm}&page=${searchPage}&per_page=12`
      );
      // const result = await axios.get(url);
      return result.data;
    },
  });
  console.log(response);
  if (response.isLoading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }
  if (response.isError) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  const results = response.data.results;
  if (results.length < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }
  // gridTemplateColumns "repeat(auto-fit, minmax(300px, 1fr))"
  return (
    // <div className="container">
    //   <ImageGroup>
    //     <ul
    //       style={{
    //         gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    //       }}
    //       className="images"
    //     >
    //       {results.map((item) => {
    //         const url = item?.urls?.regular;
    //         return (
    //           <li key={item.id}>
    //             <Image src={url} key={item.id} alt={item.alt_description} />
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </ImageGroup>
    // </div>

    <div className="container">
      <SimpleReactLightbox>
        <SRLWrapper>
          <ul
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}
            className="images"
          >
            {results.map((item) => {
              const url = item?.urls?.regular;
              return (
                <li key={item.id}>
                  <img src={url} key={item.id} alt={item.alt_description} />
                </li>
              );
            })}
          </ul>
        </SRLWrapper>
      </SimpleReactLightbox>
    </div>
  );
};
export default Gallery;
