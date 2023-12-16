// import { searchImages } from 'components/searchImages';
import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
// import Notiflix from 'notiflix';
import { Audio } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

// let innerHeight = window.innerHeight;

export class ImageGallery extends Component {
  // state = {
  //   photo: null,
  //   isLoading: false,
  //   page: 1,
  //   totalPage: 0,
  //   largeImageURL: '',
  // };

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevProps.searchWord !== this.props.searchWord ||
  //     prevState.page !== this.state.page
  //   ) {
  //     this.setState({isLoading: true});
  //     if (prevProps.searchWord !== this.props.searchWord) {
  //       this.setState({page: 1, photo: null});
  //     }
  //     searchImages(this.props.searchWord, this.state.page)
  //       .then(response => response.json())
  //       .then(photo => {
  //         if (Object.keys(photo.hits).length === 0) {
  //           Notiflix.Notify.failure('Sorry, we found nothing at your request');
  //           return;
  //         }
  //         if (this.state.page > 1) {
  //           this.setState(prev => ({
  //             photo: [...prev.photo, ...photo.hits],
  //           }), () => {
  //             if (this.state.page > 1) {
  //               this.scroll();
  //             }});
  //           console.log(photo);
  //         } else {
  //           this.setState({
  //             photo: photo.hits,
  //             totalPage: photo.totalHits,
  //           });
  //           console.log(photo);
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //         Notiflix.Notify.failure('Sorry, something went wrong');
  //       })
  //       .finally(() => {
  //         this.setState({isLoading: false});
  //       });
  //   }
  // }

  // handleSubmit = () => {
  //   this.setState({ page: this.state.page + 1 });
  // };

  // openModal = (e) => {
  //   this.setState((prev) =>({largeImageURL: e.target.dataset.source}))
  // }

  // closeModal = () => {
  //   this.setState((prev) =>({largeImageURL: ''}))
  // }

  // scroll = () => {
  //   innerHeight = innerHeight + window.innerHeight
  //   window.scrollBy({
  //     top: innerHeight,
  //     behavior: "smooth",
  //   });
  // }
  


  render() {
    const { photo, isLoading, page, totalPage, largeImageURL } = this.props.state;
    // if (status === 'pending') {
    //   return (
    //     <Audio
    //       height="80"
    //       width="80"
    //       radius="9"
    //       color="green"
    //       ariaLabel="loading"
    //       wrapperStyle
    //       wrapperClass
    //     />
    //   );
    // } else if (status === 'resolved') {
    //   return (
    //     <div>
    //       <ul className={css.gallery} onClick={this.openModal}>
    //         {photo.map(el => (
    //           <ImageGalleryItem key={el.id} imageS={el} />
    //         ))}
    //       </ul>
    //       {largeImageURL && <Modal largeImageURL={largeImageURL} closeModal={this.closeModal}/>}
    //       {page*12 <= totalPage && <Button handleSubmit={this.handleSubmit} />}
    //     </div>
    //   );
    // }
    return (
      <div>
        <ul className={css.gallery} onClick={this.props.openModal}>
          {photo &&
            photo.map(el => (
              <ImageGalleryItem key={el.id} imageS={el} />
            ))}
        </ul>
        {isLoading && <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
        />}
        {largeImageURL && <Modal largeImageURL={largeImageURL} closeModal={this.props.closeModal}/>}
        {page*12 <= totalPage && photo && !isLoading && <Button handleSubmit={this.props.handleSubmit} />}
      </div>
    );
  }
}
