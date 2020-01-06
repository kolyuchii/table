import {
    CHART_TYPES
} from 'config';

/**
 *
 * @param {array} data
 * @param {string} chartType
 * @param {number} chartSize
 * @param {number} pageNumber
 */
export default function (data, chartType, chartSize, pageNumber = 0) {
    const labels = [];
    const series = [];
    if (!data) {
        return null;
    }
    // Our field: "date_of_birth":"01/09/1960"
    const obj = {};
    const start = pageNumber * chartSize;
    data.slice(start, start + chartSize).forEach(user => {
        if (user.date_of_birth) {
            const year = user.date_of_birth.split('/')[2];
            if (obj[year]) {
                obj[year]++;
            } else {
                obj[year] = 1;
            }
        }
    });

    Object.entries(obj).forEach(item => {
        const [
            label,
            value,
        ] = item;
        labels.push(label);
        series.push(value);
    });
    const pagesCount = Math.ceil(data.length / chartSize);
    switch (chartType) {
        case CHART_TYPES.DONUT:
            return {
                pagesCount,
                series,
                options: {
                    labels
                },
            };
        case CHART_TYPES.BAR:
            return {
                pagesCount,
                series: [{
                    name: "Peoples",
                    data: series,
                }],
                options: {
                    labels,
                    plotOptions: {
                        bar: {
                            horizontal: false,
                        }
                    },
                },
            };
    }
    return {};
}