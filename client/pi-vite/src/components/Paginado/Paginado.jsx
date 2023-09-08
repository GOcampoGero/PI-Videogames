import style from './Paginado.module.css'
const Paginado = ({currentPage, TotalPages, onPageChanger}) => {
    const pageNumber = Array.from({length: TotalPages}, (_, index) => index + 1)

    return (
        <nav>
            <div className={style.div}>
                {pageNumber.map((number) => (
                    <div key={number}>
                        <button onClick={() => onPageChanger(number)}>{number}</button>
                    </div>
                ))
            }
            </div>
        </nav>
    )
}

export default Paginado;