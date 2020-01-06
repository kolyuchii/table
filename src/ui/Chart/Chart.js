import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import {
    CHART_TYPES,
    CHART_SIZES,
} from 'config';

const ChartComponent = function (props) {
    return (
        <div className="chart">
            <select onChange={props.onChange}>
                {
                    Object.values(CHART_TYPES).map(value => {
                        return (<option key={value} value={value}>{value}</option>);
                    })
                }
            </select>
            <select onChange={props.onChangePeriod}>
                {
                    CHART_SIZES.map(value => {
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

ChartComponent.propTypes = {
    onChange: PropTypes.func,
    onChangePeriod: PropTypes.func,
    onPrev: PropTypes.func,
    onNext: PropTypes.func,
    currentPageNumber: PropTypes.number,
    pagesCount: PropTypes.number,
    nextDisabled: PropTypes.bool,
    prevDisabled: PropTypes.bool,
};

export default ChartComponent;