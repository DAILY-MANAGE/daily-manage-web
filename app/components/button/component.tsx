import './component.scss';

export function Button({ children, theme = 'primary', customStyle, ...props}: any) {
  return (
    <button
      className={'Button ' + ('bg-background-' + theme) + (' bg-text-' + theme) + (' ' + customStyle)}
      {...props}
    >
      {children}
    </button>
  );
}
