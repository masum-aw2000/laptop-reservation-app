// render a single reservation preview
import '../styles/globals.scss';

const Card = ({ cardTitle, cardSubtitle, cardImg, cardOptions = [] }) => {
    return (
        <div className='card'>
            <h1 className='card-title'>{cardTitle}</h1>
            <h2 className='card-subtitle'>{cardSubtitle}</h2>
            <div className='card-body'>
                <div className='card-img'><img src={`http://localhost:3000/${cardImg}`}></img></div>
            </div>
            <div className='card-footer'>
                {/* conditionally render buttons/options if available */}
                {cardOptions.length > 0 ? (
                    <div className='card-actions'>
                        {cardOptions.map((option, index) => (
                            <div key={index} className='card-action-item'>
                                {option}
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default Card;