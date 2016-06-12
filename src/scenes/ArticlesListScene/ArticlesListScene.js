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
import ArticlesActions from '../../redux/actions/ArticlesActions';
import IconButton from '../../components/IconButton';

class ArticlesListScene extends Component {
  componentWillMount() {
    return this.props.dispatch(ArticlesActions.fetch({page_number: 1}));
  }
  
  render () {
    let { articles, fetching, errorMessage } = this.props;
    let handleOnLoadMore = this._handleOnLoadMore.bind(this);
    let handleOnPressRetryButton = this._handleOnPressRetryButton.bind(this);
    let handleSubmitSearch = this._handleSubmitSearch.bind(this);
    let handleCloseSearch = this._handleCloseSearch.bind(this);

    return <View style={styles.root}>
      <NavBar
        title='Artículos'
        searchable={true}
        leftIcon={<IconButton iconName='menu' />}
        onSubmitSearch={handleSubmitSearch}
        onCloseSearch={handleCloseSearch}
      />
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
      this.props.dispatch(ArticlesActions.fetch({page_number: page_number + 1 }));
    }
  }

  _handleOnLoadMore () {
    let {fetching} = this.props;

    if (fetching == false) {
      this._loadMoreArticles();
    }
  }

  _handleOnPressRetryButton () {
    this.props.dispatch(ArticlesActions.resetError());
    this._loadMoreArticles();
  }

  _handleSubmitSearch (searchText) {
    this.props.dispatch(ArticlesActions.setSearchText(searchText));
    this.props.dispatch(ArticlesActions.resetList());
    this.props.dispatch(ArticlesActions.fetch({page_number: 1}));
  }

  _handleCloseSearch () {
    if (this.props.searchText) {
      this.props.dispatch(ArticlesActions.setSearchText(''));
      this.props.dispatch(ArticlesActions.resetList());
      this.props.dispatch(ArticlesActions.fetch({page_number: 1}));
    }
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
    errorMessage: state.articles.get('errorMessage'),
    searchText: state.articles.get('searchText')
  };
};

ArticlesListScene = connect(
  mapStateToProps
)(ArticlesListScene);

export default ArticlesListScene;
