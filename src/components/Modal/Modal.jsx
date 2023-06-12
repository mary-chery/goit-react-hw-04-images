import { useEffect } from 'react';
import css from './Modal.module.css';

export function Modal({ imageUrl, onClose }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className={css.Overlay} onClick={onClose}>
      <div className={css.Modal}>
        <img src={imageUrl} alt="photos" />
      </div>
    </div>
  );
}

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = event => {
//     if (event.code === 'Escape') {
//       this.props.onClose();
//     }
//   };

//   render() {
//     return (
// <div className={css.Overlay} onClick={this.props.onClose}>
//   <div className={css.Modal}>
//     <img src={this.props.imageUrl} alt="photos" />
//   </div>
// </div>
//     );
//   }
// }
