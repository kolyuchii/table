import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {
    SORT_TYPE,
    CHART_TYPES,
    PAGE_SIZES,
    PAGINATION_TYPE,
} from 'config';

import LoadingComponent from 'ui/Loading';
import EmptyComponent from 'ui/Empty';
import PaginationComponent from 'ui/Pagination';
import Chart from "react-apexcharts"; // https://apexcharts.com/
import ChartComponent from 'ui/Chart';

import {
    fetchUsers,
    sortByDob,
    sortByIndustry,
    sortBySalary,
    updatePageSize,
    updatePageNumber,
    search,
    filter,
    reset,
} from 'store/app';
import GridComponent from 'ui/Grid';
import AppComponent from 'ui/App';
import SuggestComponent from 'ui/Suggest';
import getChartConfig from './get-chart-config';

class AppContainer extends React.Component {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();
        this.state = {
            chartType: CHART_TYPES.DONUT,
            chartSize: PAGE_SIZES[0],
            pageNumber: 0,
        };
    }
    render() {
        const {
            data,
            page,
            suggestions,
            toggleReset,
            pagesCount,
            currentPageNumber,
        } = this.props;
        const {
            chartType,
            chartSize,
            pageNumber,
        } = this.state;
        // if no page data show the loading
        if (!page) {
            return <LoadingComponent />
        }
        // otherwise, show suggestion form, pagination and a grid
        const chartConfig = getChartConfig(data, chartType, chartSize, pageNumber);
        return (
            <AppComponent>
                <SuggestComponent
                    inputRef={this.inputRef}
                    suggestions={suggestions}
                    toggleReset={toggleReset}
                    onSuggest={this.onSuggest.bind(this)}
                    onSuggestionClick={this.onSuggestionClick.bind(this)}
                    onSearch={this.onSearch.bind(this)}
                    resetFilters={this.resetFilters.bind(this)}
                />
                <PaginationComponent
                    pagesCount={pagesCount}
                    currentPageNumber={currentPageNumber + 1}
                    prevDisabled={currentPageNumber === 0}
                    nextDisabled={currentPageNumber + 1 >= pagesCount}
                    onNext={this.onNext.bind(this)}
                    onPrev={this.onPrev.bind(this)}
                    onItemsPerPage={this.onItemsPerPage.bind(this)}
                />
                {page.length ? (<GridComponent
                    users={page}
                    currentTab={this.state.currentTab}
                    sortType={this.state.sortType}
                    onClick={this.onSort.bind(this)}
                />) : <EmptyComponent />}
                <ChartComponent
                    pagesCount={chartConfig.pagesCount || 0}
                    currentPageNumber={pageNumber + 1}
                    prevDisabled={pageNumber === 0}
                    nextDisabled={pageNumber + 1 >= chartConfig.pagesCount}
                    onPrev={this.onChangeChartPage.bind(this, PAGINATION_TYPE.PREV)}
                    onNext={this.onChangeChartPage.bind(this, PAGINATION_TYPE.NEXT)}
                    onChange={this.onChartChange.bind(this)}
                    onChangePeriod={this.onChangePeriod.bind(this)}
                />
                <Chart
                    options={chartConfig.options}
                    series={chartConfig.series}
                    type={this.state.chartType}
                    height="300"
                />
            </AppComponent>
        );
    }
    onChangeChartPage(type) {
        const pageNumber = this.state.pageNumber;
        this.setState({
            pageNumber: type === PAGINATION_TYPE.NEXT ? pageNumber + 1 : pageNumber - 1
        });
    }
    onChangePeriod(event) {
        this.setState({
            chartSize: event.target.value,
            pageNumber: 0,
        });
    }

    onChartChange(event) {
        this.setState({
            chartType: event.target.value,
        });
    }

    onSuggestionClick(event) {
        this.inputRef.current.value = event.target.innerText;
        this.props.actions.search('');
    }

    resetFilters() {
        this.inputRef.current.value = '';
        this.props.actions.reset();
    }

    onSuggest(event) {
        this.props.actions.search(event.target.value);
    }

    onSearch() {
        const value = this.inputRef.current.value;
        this.props.actions.filter(value);
    }

    onItemsPerPage(event) {
        this.props.actions.updatePageSize(Number(event.target.value));
    }

    onPrev() {
        this.props.actions.updatePageNumber(PAGINATION_TYPE.PREV);
    }

    onNext() {
        this.props.actions.updatePageNumber(PAGINATION_TYPE.NEXT);
    }

    // handle sort by type and use state to save the sort direction
    onSort(type) {
        const sortType = this.state[type] || SORT_TYPE.ASC;
        switch (type) {
            case 'dob':
                this.props.actions.sortByDob(sortType);
                break;
            case 'industry':
                this.props.actions.sortByIndustry(sortType);
                break;
            case 'salary':
                this.props.actions.sortBySalary(sortType);
                break;
        }
        this.setState({
            [type]: sortType === SORT_TYPE.ASC ? SORT_TYPE.DES : SORT_TYPE.ASC,
            currentTab: type,
            sortType,
        });
    }

    componentDidMount() {
        this.props.actions.fetchUsers();
    }
}

AppContainer.propTypes = {
    users: PropTypes.array,
    data: PropTypes.array,
    actions: PropTypes.object,
    suggestions: PropTypes.array,
    page: PropTypes.array,
    toggleReset: PropTypes.bool,
    pagesCount: PropTypes.number,
    currentPageNumber: PropTypes.number,
};

function mapStateToProps(state) {
    return {
        page: state.app.page,
        data: state.app.data,
        currentPageNumber: state.app.currentPageNumber,
        pagesCount: state.app.pagesCount,
        suggestions: state.app.suggestions,
        toggleReset: state.app.toggleReset,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            fetchUsers,
            sortBySalary,
            sortByIndustry,
            sortByDob,
            updatePageSize,
            updatePageNumber,
            search,
            filter,
            reset,
        }, dispatch)
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer)