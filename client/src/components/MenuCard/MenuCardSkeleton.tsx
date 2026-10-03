const MenuCardSkeleton = () => (
  <div className="card card--skeleton" aria-hidden="true">
    <div className="card__media skeleton " />
    <div className="card__body">
      <span className="skeleton skeleton--title" />
      <span className="skeleton skeleton--line" />
      <span className="skeleton skeleton--line-short" />
      <div className="card__footer">
        <span className="skeleton skeleton--price" />
        <span className="skeleton skeleton--button" />
      </div>
    </div>
  </div>
);

export default MenuCardSkeleton;
