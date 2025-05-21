function Card ({ value }) {
    console.log("Renderuję kartę z wartością:", value);
    return (
        <div className="card">
            {/* Placeholder */}
            <span>{value}</span>
        </div>
        
    )
}

export default Card