import { Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSearch: (topic: string) => void; 
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <header className={css.header}>
      <Formik
        initialValues={{ topic: '' }}
        onSubmit={(values, actions) => {
          if (values.topic.trim() === '') {
            toast('Please enter a search term.');
            return;
          }
          onSearch(values.topic);
          actions.resetForm();
        }}
      >
        <Form className={css.form}>
          <Field
            type="text"
            name="topic"
            className={css.input}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button type="submit" className={css.button}>
            <FontAwesomeIcon className={css.icon} icon={faMagnifyingGlass} />
          </button>
        </Form>
      </Formik>
    </header>
  );
};

export default SearchBar;
