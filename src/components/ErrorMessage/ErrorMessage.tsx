import css from './ErrorMessage.module.css';

const ErrorMessage: React.FC = () => {
  return (
    <div className={css.error}>
      <b>Failed to fetch articles. Please try again!</b>
    </div>
  );
};

export default ErrorMessage;