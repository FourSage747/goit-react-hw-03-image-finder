import css from './Button.module.css'
export const Button = ({handleSubmit}) => {
    return (
        <button type="button" className={css.loadmore} onClick={handleSubmit}>Load more</button>
    )
}