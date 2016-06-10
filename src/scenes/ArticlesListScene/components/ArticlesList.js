/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  ListView
} from 'react-native';

/* Components */
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {
  constructor (props) {
    super(props);

    let dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.state = {
      articlesDS: dataSource
    }
  }

  componentWillReceiveProps (newProps) {
    if (newProps.articles !== this.props.articles) {
      this.setState({
        articlesDS: this.state.articlesDS.cloneWithRows(newProps.articles)
      });
    }
  }

  render () {
    let {articlesDS} = this.state;
    let handleEndReached = this._handleEndReached.bind(this);

    return <ListView
      enableEmptySections={true}
      dataSource={articlesDS}
      renderRow={(article) => {
        return <ArticleCard article={article} />
      }}
      onEndReached={handleEndReached}
    />
  }

  _handleEndReached () {
    if (this.props.onLoadMore) {
      return this.props.onLoadMore();
    }
  }
}

const styles = StyleSheet.create({
  root: {
  }
});

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func
};

export default ArticlesList;
