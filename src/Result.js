import React from 'react';
import PropTypes from 'prop-types';

class Result extends React.Component {
    static propTypes = {
        data: PropTypes.object
    }
    constructor(props) {
        super(props);
    }

    render() {
        const { data } = this.props;
    return (
    <div className="resultRow" key={data.id}>
        <div className="title">
            <a className="ext-link" target="_blank" href={decodeURI(data.id)}><span dangerouslySetInnerHTML={{ __html: data.title }}/></a>
        </div>

        <div className="description">
            <span dangerouslySetInnerHTML={{ __html: data.description }}/>
        </div>

        <div className="keywords">
            <span>{data.keywords ? "Keywords:" + data.keywords.join(", ") : ''}</span>
        </div>
    </div>
    );
    }
}

export default Result;