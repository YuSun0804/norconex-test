import './App.css';
import React from 'react';
import Result from './Result';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      resultList: [],
      afterSearch: false,
    };
  }
  render() {
    return (
      <div>
        <div className="searchBar">
          <div className="searchBarForm">
            <button type="submit" className="searchButton" onClick={this._search.bind(this)} />
            <input type="text" placeholder="Search" name="search" className="searchInput" id="searchText" value={this.state.searchTerm} onChange={(e) => {this.setState({ searchTerm: e.target.value }); this.setState({afterSearch : false})}} onKeyDown={(e) => { if (e.key === 'Enter') { this._search() } }} />
          </div>
        </div>
        {this.state.resultList.length > 0 ? this.state.resultList.map((item) => <Result data={item} />) : this.state.searchTerm !== '' && this.state.afterSearch? <div className="noResult">No result</div> : null}
      </div>
    );
  }


  _search() {
    const text = this.state.searchTerm;
    console.log(text);
    fetch('http://ec2-18-222-31-66.us-east-2.compute.amazonaws.com:8983/solr/norconex/select?q=title:' + text + '^3 description:' + text + '^2 content:' + text + "&hl.fl=title description&hl.simple.post=</span>&hl.simple.pre=<span style=\"font-weight:bold\">&hl=on&hl.fragsize=0")
      .then(res => res.json())
      .then((result) => {
        const _docs = result.response.docs
        const _hls = result.highlighting
        const _docMap = {}
        _docs.map(doc => _docMap[doc.id] = doc);
        for (let i in _hls) {
          for (let j in _hls[i]) {
            _docMap[i][j] = _hls[i][j][0]
          }

        }
        this.setState({
          resultList: Object.values(_docMap)
        });
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
    this.state.afterSearch = true
  }

}

export default App;
