export const ImageGalleryItem = ({ imageS}) => {
  return (
    <li className="gallery-item">
      <img src={imageS.webformatURL} alt="" data-source={imageS.largeImageURL} width="430"/>
    </li>
  );
};
