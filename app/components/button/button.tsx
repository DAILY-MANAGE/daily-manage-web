import './button.scss'

export function Button({ children, disabled = false, theme } : any) {
    return (
        <button className={'Button ' + 'bg-background-' + theme + ' bg-text-' + theme} disabled={disabled}>{ children }</button>
    );
}