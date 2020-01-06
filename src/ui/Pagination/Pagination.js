import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {
    PAGE_SIZES
} from 'config';

const PaginationComponent = function(props) {
    return (
        <div className="pagination">
            <b>Items per page: </b>
            <select className="pagination__select" onChange={props.onItemsPerPage}>
                {
                    PAGE_SIZES.map(value => {
                        return (<option key={value} value={value}>{value}</option>);
                    })
                }
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