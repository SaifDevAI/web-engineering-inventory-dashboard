export default function CardWrapper({ children, title }) {
  return (
    <div className="card-wrapper">
      {title && <h3 className="card-title">{title}</h3>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}
