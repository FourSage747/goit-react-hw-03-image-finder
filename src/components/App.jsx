import { Component } from 'react';
import { searchImages } from 'components/searchImages';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import Notiflix from 'notiflix';

let innerHeight = window.innerHeight;

export class App extends Component {
  state = {
    searchWord: '',
    photo: null,
    isLoading: false,
    page: 1,
    totalPage: 0,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchWord !== this.state.searchWord ||
      prevState.page !== this.state.page
    ) {
      this.setState({isLoading: true});
      // if (prevState.searchWord !== this.state.searchWord) {
      //   this.setState({page: 1, photo: null});
      // }
      searchImages(this.state.searchWord, this.state.page)
        .then(response => response.json())
        .then(photo => {
          if (Object.keys(photo.hits).length === 0) {
            Notiflix.Notify.failure('Sorry, we found nothing at your request');
            return;
          }
          if (this.state.page > 1) {
            this.setState(prev => ({
              photo: [...prev.photo, ...photo.hits],
            }), () => {
              if (this.state.page > 1) {
                this.scroll();
              }});
            console.log(photo);
          } else {
            this.setState({
              photo: photo.hits,
              totalPage: photo.totalHits,
            });
            console.log(photo);
          }
        })
        .catch(err => {
          console.log(err);
          Notiflix.Notify.failure('Sorry, something went wrong');
        })
        .finally(() => {
          this.setState({isLoading: false});
        });
    }
  }

  onSubmit = (searchWord) => {
    this.setState({ searchWord, page: 1, photo: null });
  };

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
    return (
      <div
      // style={{
      //   height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101'
      // }}
      >
        <Searchbar onSubmit={this.onSubmit} />
        <ImageGallery 
          state={this.state}
          handleSubmit={this.handleSubmit}
          openModal={this.openModal}
          closeModal={this.closeModal}
        />
      </div>
    );
  }
}
