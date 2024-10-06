import {Audio} from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <Audio
        color="#00BFFF"
        height={80}
        width={80}
        radius={9}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}} 
        wrapperClass=""
      />
    </div>
  );
}
