import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./context";
import { useState } from "react";
import Inline from "yet-another-react-lightbox/plugins/inline";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Download from "yet-another-react-lightbox/plugins/download";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";
import { RowsPhotoAlbum } from "react-photo-album";

const url = `https://api.unsplash.com/search/photos?client_id=${
  import.meta.env.VITE_API_KEY
}`;

const inline = {
  style: {
    width: "100%",
    maxWidth: "900px",
    aspectRatio: "3 / 2",
    margin: "0 auto",
  },
};

const Gallery = () => {
  const { searchTerm, searchPage } = useGlobalContext();
  const [index, setIndex] = useState(-1);

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

console.log(results);
const slides = results.map((item, index) => {
  
})

  return (
    <>
   <div className="container">
      <ul
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
          className="images"
        >
          {results.map((item, id) => {
            const url = item?.urls?.regular;
            // const index = item.id
            return (
              <li key={id} >
                <img src={url} key={id} alt={item.alt_description} onClick={() => setIndex(id)}/>
              </li>
            );
          })}
        </ul>

        </div>

      <Lightbox
        index={index}
        slides={results.map((item, id) => ({
          src: item?.urls?.regular,
        }))}
        inline={inline}
        open={index >= 0}
        // open={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom, Download]}
      />

    </>
  );
};
export default Gallery;
