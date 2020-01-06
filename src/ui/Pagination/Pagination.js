import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const PaginationComponent = function(props) {
    return (
        <div className="pagination">
            <select className="pagination__select" onChange={props.onItemsPerPage}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
            <button disabled={props.prevDisabled} onClick={props.onPrev}>Prev</button>
            <div className="pagination__counter">{props.currentPageNumber}/{props.pagesCount}</div>
            <button disabled={props.nextDisabled} onClick={props.onNext}>Next</button>
        </div>
    );
};

PaginationComponent.propTypes = {
    onItemsPerPage: PropTypes.func,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    prevDisabled: PropTypes.bool,
    nextDisabled: PropTypes.bool,
    currentPageNumber: PropTypes.number,
    pagesCount: PropTypes.number,
};

export default PaginationComponent;