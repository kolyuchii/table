import React from 'react';
import './styles.scss';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {
    SORT_TYPE,
} from 'config';

const GridComponent = function (props) {
    const dob = classnames({
        "grid__head_item": true,
        "sorting": true,
        "is-active": props.currentTab === 'dob',
        "is-asc-sort": props.currentTab === 'dob' && props.sortType === SORT_TYPE.ASC,
        "is-des-sort": props.currentTab === 'dob' && props.sortType === SORT_TYPE.DES,
    });
    const industry = classnames({
        "grid__head_item": true,
        "sorting": true,
        "is-active": props.currentTab === 'industry',
        "is-asc-sort": props.currentTab === 'industry' && props.sortType === SORT_TYPE.ASC,
        "is-des-sort": props.currentTab === 'industry' && props.sortType === SORT_TYPE.DES,
    });
    const salary = classnames({
        "grid__head_item": true,
        "sorting": true,
        "is-active": props.currentTab === 'salary',
        "is-asc-sort": props.currentTab === 'salary' && props.sortType === SORT_TYPE.ASC,
        "is-des-sort": props.currentTab === 'salary' && props.sortType === SORT_TYPE.DES,
    });
    return <table className="grid" cellSpacing="0" cellPadding="0">
        <thead>
            <tr className="grid__head">
                <th className="grid__head_item">First Name</th>
                <th className="grid__head_item">Last Name</th>
                <th className="grid__head_item">Email</th>
                <th className={dob} onClick={props.onClick.bind(this, 'dob')}>DOB</th>
                <th className={industry} onClick={props.onClick.bind(this, 'industry')}>Industry</th>
                <th className={salary} onClick={props.onClick.bind(this, 'salary')}>Salary</th>
                <th className="grid__head_item is-last">Experience</th>
            </tr>
        </thead>
        <tbody>
            {getRows(props.users)}
        </tbody>
    </table>;
};

function getRows(users) {
    return users.map(user => {
        return <tr key={user.id} className="grid__row">
            <td className="grid__row_item">{user.first_name || 'null'}</td>
            <td className="grid__row_item">{user.last_name || 'null'}</td>
            <td className="grid__row_item">{user.email || 'null'}</td>
            <td className="grid__row_item">{user.date_of_birth || 'null'}</td>
            <td className="grid__row_item">{user.industry || 'null'}</td>
            <td className="grid__row_item">{user.salary || 'null'}</td>
            <td className="grid__row_item is-last">{user.years_of_experience || 'null'}</td>
        </tr>
    });
}

GridComponent.propTypes = {
    users: PropTypes.array,
    currentTab: PropTypes.string,
    sortType: PropTypes.string,
    onClick: PropTypes.func,
};

export default GridComponent;