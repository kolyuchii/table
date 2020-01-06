import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';

const SuggestComponent = function (props) {
    return (
        <div className="suggest">
            <div className="suggest__controls">
                <input ref={props.inputRef} type="text" onChange={props.onSuggest} />
                <button onClick={props.onSearch}>Find</button>

                {props.toggleReset ? (
                    <button onClick={props.resetFilters}>Reset filters</button>
                ) : null}
            </div>
            {props.suggestions ? (
                <ul className="suggest__list">{getSuggestionItems(props.suggestions, props.onSuggestionClick)}</ul>
            ) : null}
        </div>
    );
};

function getSuggestionItems(suggestions, onClick) {
    if (suggestions) {
        return suggestions.map(suggestion => {
            return <li
                className="suggest__list_item"
                onClick={onClick}
                key={suggestion.id}>
                {suggestion.first_name} {suggestion.last_name}
            </li>;
        });
    }
    return null;
}

SuggestComponent.propTypes = {
    inputRef: PropTypes.object,
    onSuggest: PropTypes.func,
    onSearch: PropTypes.func,
    onSuggestionClick: PropTypes.func,
    resetFilters: PropTypes.func,
    toggleReset: PropTypes.bool,
    suggestions: PropTypes.array,
};

export default SuggestComponent;