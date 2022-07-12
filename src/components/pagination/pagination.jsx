import ReactPaginate from "react-paginate";
import "./pagination.css";
const Pagination = (props) => {
  return (
    <div className="container">
      <ReactPaginate
        previousLabel={props.previousLabel}
        nextLabel={props.nextLabel}
        pageCount={props.pageCount}
        onPageChange={props.onPageChange}
        containerClassName={props.containerClassName}
        previousLinkClassName={props.previousLinkClassName}
        nextLinkClassName={props.nextLinkClassName}
        disabledClassName={props.disabledClassName}
        activeClassName={props.activeClassName}
        marginPagesDisplayed={props.marginPagesDisplayed}
        pageRangeDisplayed={props.pageRangeDisplayed}
      />
    </div>
  );
};

export default Pagination;
