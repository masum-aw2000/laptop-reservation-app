// render card with laptop information

const LaptopCard = ({ laptop, onSelect }) => {

    return (
        <div className="laptop-card" onClick={() => onSelect(laptop)}>
            <div className="card-hearder">
                <h3>{laptop.name}</h3>
            </div>
            <div className="card-img"></div>
            <div className="card-body">
                <p>Operating System: {laptop.os}</p>
                <p>Processor: {laptop.processor}</p>
                <p>RAM: {laptop.ram}</p>
                <p>Storage: {laptop.storage}</p>
            </div>
            <div className="card-footer">
                <button>Select</button>
            </div>
        </div>
    )
};

export default LaptopCard;