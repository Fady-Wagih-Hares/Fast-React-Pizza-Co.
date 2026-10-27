import { Link } from "react-router-dom";

const Button = ({ children, disabled, to, type, onClick }) => {
  // const className =
  //   "bg-yellow-400 font-semibold uppercase text-stone-800 py-3 px-4 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed sm:px-6 sm:py-4";
  const base =
    "bg-yellow-400 text-sm font-semibold uppercase text-stone-800 text-center tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:bg-yellow-300 focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ";

  const styles = {
    primary: base + "inline-block py-3 px-4 md:px-6 md:py-4",
    small:
      base + "inline-block whitespace-nowrap py-2 px-4 sm:px-5 sm:py-2.5 text-xs",
    round:
      base +
      "inline-flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9 text-sm leading-none",
    secondary:
      "inline-block text-sm text-center font-semibold border border-stone-300 uppercase text-stone-400 tracking-wide rounded-full whitespace-nowrap hover:bg-stone-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:bg-stone-300 focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 py-[0.6875rem] px-4 md:px-6 md:py-[0.9375rem] hover:text-stone-800 focus:text-stone-800",
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  return (
    // instead of use @apply in css file we can make reusable react component like this
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};
export default Button;
