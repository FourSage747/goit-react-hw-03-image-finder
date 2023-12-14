export const ImageGalleryItem = ({ imageS}) => {
  return (
    <li key={imageS.id} className="gallery-item">
      <img src={imageS.webformatURL} alt="" data-source={imageS.largeImageURL} width="430"/>
    </li>
  );
};
