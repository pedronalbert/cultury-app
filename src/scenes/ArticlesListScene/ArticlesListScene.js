/* Dependencies */
import React, {
  Component
} from 'react';

import {
  View,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

/* Components */
import NavBar from './components/NavBar';
import ArticlesList from './components/ArticlesList';
import ArticlesActions from '../../redux/actions/ArticlesActions';
import IconButton from '../../components/IconButton';

class ArticlesListScene extends Component {
  constructor (props) {
    super(props);
    
    this._loadMoreArticles = this._loadMoreArticles.bind(this);
    this._handleSubmitSearch = this._handleSubmitSearch.bind(this);
    this._handleCloseSearch = this._handleCloseSearch.bind(this);
    this._handlePressRetryButton = this._handlePressRetryButton.bind(this);
  }

  componentWillMount() {
    this._loadMoreArticles();
  }
  
  render () {
    let { articles, fetching, errorMessage } = this.props;

    return <View style={styles.root}>
      <NavBar
        title='Artículos'
        searchable={true}
        leftIcon={<IconButton iconName='menu' />}
        onSubmitSearch={this._handleSubmitSearch}
        onCloseSearch={this._handleCloseSearch}
      />
      <ArticlesList 
        articles={articles}
        fetching={fetching}
        errorMessage={errorMessage}
        onLoadMore={this._loadMoreArticles}
        onPressRetryButton={this._handlePressRetryButton}
      />
    </View>
  }

  _loadMoreArticles () {
    if (this.props.fetching == false) {
      let {page_number, page_count} = this.props.articles_meta;

      if (page_count > page_number) {
        this.props.articlesActions.fetch({page_number: page_number + 1});
      }
    }
  }

  _handleSubmitSearch (searchText) {
    this.props.articlesActions.setSearchText(searchText);
  }

  _handleCloseSearch () {
    this.props.articlesActions.setSearchText('');
  }

  _handlePressRetryButton () {
    this.props.articlesActions.resetError();
    this._loadMoreArticles();
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.1)'
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    articlesActions: {
      fetch: (params) => {
        dispatch(ArticlesActions.fetch(params));
      },

      resetError: () => {
        dispatch(ArticlesActions.resetError());
      },

      setSearchText: (text) => {
        dispatch(ArticlesActions.setSearchText(text));
      },

      resetList: () => {
        dispatch(ArticlesActions.resetList());
      }
    }
  }
}

ArticlesListScene = connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticlesListScene);

export default ArticlesListScene;
