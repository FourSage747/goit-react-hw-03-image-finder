import { Component } from 'react';
import css from './Modal.module.css'

export class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydownEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydownEsc);
  }

  onKeydownEsc = e => {
    if (e.code === 'Escape') this.props.closeModal();
  };

  render() {
    const { largeImageURL, closeModal } = this.props;
    

    
    return (
        <div className={css.Overlay} onClick={closeModal}>
            <div className="Modal">
                <img src={largeImageURL} alt="" width="800" />
            </div>
        </div>
    );
  }
}
