import React, { useState } from 'react';
import css from './Searchbar.module.css';

export function Searchbar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    onSearch(searchQuery);
    setSearchQuery('');
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleFormSubmit}>
        <input
          className={css.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
    </header>
  );
}

// export class Searchbar extends Component {
//   state = {
//     searchQuery: '',
//   };

//   handleInputChange = event => {
//     this.setState({ searchQuery: event.target.value });
//   };

//   handleFormSubmit = event => {
//     event.preventDefault();
//     const { searchQuery } = this.state;
//     this.props.onSearch(searchQuery);
//     this.setState({ searchQuery: '' });
//   };

//   render() {
//     return (
// <header className={css.Searchbar}>
//   <form className={css.SearchForm} onSubmit={this.handleFormSubmit}>
//     <input
//       className={css.SearchFormInput}
//       type="text"
//       autoComplete="off"
//       autoFocus
//       placeholder="Search images and photos"
//       value={this.state.searchQuery}
//       onChange={this.handleInputChange}
//     />
//     <button type="submit" className={css.SearchFormButton}>
//       <span className={css.SearchFormButtonLabel}>Search</span>
//     </button>
//   </form>
// </header>
//     );
//   }
// }
