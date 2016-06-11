/* Dependencies */
import React, {
  Component
} from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import {
  MKSpinner,
  MKButton,
  MKColor
} from 'react-native-material-kit';
import { connect } from 'react-redux';

/* Components */
import NavBar from './components/NavBar';
import ArticlesList from './components/ArticlesList';
import { loadArticles, resetArticlesError } from '../../redux/actions/ArticlesActions';

class ArticlesListScene extends Component {
  componentWillMount() {
    return this._loadMoreArticles();
  }
  
  render () {
    let { articles, fetching, errorMessage } = this.props;
    let handleOnLoadMore = this._handleOnLoadMore.bind(this);
    let handleOnPressRetryButton = this._handleOnPressRetryButton.bind(this);

    return <View style={styles.root}>
      <NavBar/>
      <ArticlesList 
        articles={articles}
        fetching={fetching}
        errorMessage={errorMessage}
        onLoadMore={handleOnLoadMore}
        onPressRetryButton={handleOnPressRetryButton}
      />
    </View>
  }

  _loadMoreArticles () {
    let {page_number, page_count} = this.props.articles_meta;

    if (page_count > page_number) {
      this.props.dispatch(loadArticles(page_number+1))
    }
  }

  _handleOnLoadMore () {
    let {fetching} = this.props;

    if (fetching == false) {
      this._loadMoreArticles();
    }
  }

  _handleOnPressRetryButton () {
    this.props.dispatch(resetArticlesError());
    this._loadMoreArticles();
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)'
  },

  spinner: {
    width: 32,
    height: 32
  },

  spinnerContainer: {
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center'
  },

  errorCointainer: {
    padding: 12,
    alignItems: 'center'
  },

  retryButton: {
    height: 36,
    marginTop: 8,
    paddingRight: 8,
    paddingLeft: 8,
    justifyContent: 'center'
  },

  retryButtonText: {
    color: MKColor.Blue,
    fontWeight: 'bold'
  }
});

const mapStateToProps = (state) => {
  let articlesIds = state.articles.get('ids');
  let articles = [];

  articlesIds.forEach(articleId => {
    let article = state.entities.getIn(['articles', articleId.toString()]);

    if (article) {
      articles.push(article.toJS());
    }
  })

  return {
    articles: articles,
    articles_meta: state.articles.get('meta').toJS(),
    fetching: state.articles.get('fetching'),
    errorMessage: state.articles.get('errorMessage')
  };
};

ArticlesListScene = connect(
  mapStateToProps
)(ArticlesListScene);

export default ArticlesListScene;
