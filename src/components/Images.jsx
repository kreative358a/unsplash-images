import React from "react";
import { ImageGroup, Image } from "react-fullscreen-image";

const Images = ({ loading, error, items, resultsLength }) => {
  if (loading) {
    return (
      <section className="image-container">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (error) {
    return (
      <section className="image-container">
        <h4>There was an error...</h4>
      </section>
    );
  }

  if (resultsLength < 1) {
    return (
      <section className="image-container">
        <h4>No results found...</h4>
      </section>
    );
  }

  return (
    <div className="container">
      <ImageGroup>
        <ul
          // style={{
          //   gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          // }}
          className="images"
        >
          {items.map((item) => {
            const url = item?.urls?.regular;
            return (
              <li key={item.id}>
                <Image src={url} key={item.id} alt={item.alt_description} />
              </li>
            );
          })}
        </ul>
      </ImageGroup>
    </div>
  );
};

export default Images;
