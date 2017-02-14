import React from 'react';
import retext from 'retext';
import nlcstToString from 'nlcst-to-string';
import keywords from 'retext-keywords';
import _ from 'lodash';
class Keywords extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
            keyWordsArr: [],
            keyPhrasesArr: []
        };
        this.handleInputPress = this.handleInputPress.bind(this);
    }
    handleInputPress(e) {
        var self = this;
        if (e.key === 'Enter') {
            let content = e.target.value;
            let keyWordsArr = [];
            let keyPhrasesArr = [];
            retext().use(keywords).process(content, function(err, file) {
                if(err) {
                    return;
                }
                file.data.keywords.forEach(function(keyword) {
                    keyWordsArr.push(nlcstToString(keyword.matches[0].node));
                });


                file.data.keyphrases.forEach(function(phrase) {
                    keyPhrasesArr.push(phrase.matches[0].nodes.map(nlcstToString).join(''));
                });

                self.setState({
                    keyWordsArr: keyWordsArr,
                    keyPhrasesArr: keyPhrasesArr
                });
            });
        }
    }
    renderPassageIntput() {
        return (
            <div className="row">
                <div className="col-md-6">
                    <textarea type="text"
                        className="form-control"
                        onKeyPress={this.handleInputPress}
                        placeholder="Paste in an article" />
                </div>
            </div>
        );
    }

    renderResult() {
        return (
            <div>
                <div className="row col-md-6">
                    <h3>Keywords</h3>
                    {this.state.keyWordsArr.map((keyword) => {
                        return (<div> {keyword} </div>);
                    })}
                </div>
                <div className="row col-md-6">
                    <h3>Key Phrases</h3>
                    {this.state.keyPhrasesArr.map((keyphrase) => {
                        return (<div> {keyphrase} </div>);
                    })}
                </div>
            </div>
        );
    }
    render() {
        return (
            <div className="container">
                <h2>Keywords Exactor</h2>
                    {this.renderPassageIntput()}
                    {this.renderResult()}
            </div>
        );
    }
}

export default Keywords;
