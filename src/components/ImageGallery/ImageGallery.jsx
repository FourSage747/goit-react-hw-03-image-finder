import { searchImages } from 'components/searchImages';
import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import Notiflix from 'notiflix';
import { Audio } from 'react-loader-spinner';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

let innerHeight = window.innerHeight;

export class ImageGallery extends Component {
  state = {
    photo: null,
    status: 'idle',
    page: 1,
    totalPage: 0,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState)
    if (
      prevProps.searchWord !== this.props.searchWord ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });
      if (prevProps.searchWord !== this.props.searchWord) {
        this.setState({page: 1});
      }
      searchImages(this.props.searchWord, this.state.page)
        .then(response => response.json())
        .then(photo => {
          if (Object.keys(photo.hits).length === 0) {
            Notiflix.Notify.failure('Sorry, we found nothing at your request');
            this.setState({ status: 'rejected' });
            return;
          }
          // if (this.state.page > 1) {
          //   this.scroll();
          // }
          if (this.state.page > 1) {
            this.setState(prev => ({
              photo: [...prev.photo, ...photo.hits],
              status: 'resolved',
            }), () => {
              if (this.state.page > 1) {
                this.scroll();
              }});
            console.log(photo);
          } else {
            this.setState({
              photo: photo.hits,
              totalPage: photo.totalHits,
              status: 'resolved',
            });
            console.log(photo);
          }
        })
        .catch(err => {
          console.log(err);
          Notiflix.Notify.failure('Sorry, something went wrong');
          this.setState({ status: 'rejected' });
        });
    }
  }

  handleSubmit = () => {
    this.setState({ page: this.state.page + 1 });
  };

  openModal = (e) => {
    this.setState((prev) =>({largeImageURL: e.target.dataset.source}))
  }

  closeModal = () => {
    this.setState((prev) =>({largeImageURL: ''}))
  }

  scroll = () => {
    innerHeight = innerHeight + window.innerHeight
    window.scrollBy({
      top: innerHeight,
      behavior: "smooth",
    });
  }
  


  render() {
    const { photo, status, page, totalPage, largeImageURL } = this.state;
    if (status === 'pending') {
      return (
        <Audio
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      );
    } else if (status === 'resolved') {
      return (
        <div>
          <ul className={css.gallery} onClick={this.openModal}>
            {photo.map(el => (
              <ImageGalleryItem key={el.id} imageS={el} />
            ))}
          </ul>
          {largeImageURL && <Modal largeImageURL={largeImageURL} closeModal={this.closeModal}/>}
          {page*12 <= totalPage && <Button handleSubmit={this.handleSubmit} />}
        </div>
      );
    }
    // return (
    //   <ul className="gallery">
    //     {photo &&
    //       photo.map(el => (
    //         <ImageGalleryItem key={el.id} imageS={el.webformatURL} />
    //       ))}
    //   </ul>
    // );
  }
}
