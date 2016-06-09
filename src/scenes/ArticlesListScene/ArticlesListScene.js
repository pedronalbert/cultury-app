/* Dependencies */
import React, {
  Component
} from 'react';

import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';

/* Components */
import NavBar from './components/NavBar';
import ArticlesList from './components/ArticlesList';
import { loadArticles } from '../../redux/actions/ArticlesActions';

class ArticlesListScene extends Component {
  componentWillMount() {
    return this._loadMoreArticles();
  }
  
  render () {
    let handlePressMenuButton = this._handlePressMenuButton.bind(this);
    let {articles, fetching} = this.props;

    return <View style={styles.root}>
      <NavBar onPressMenuButton={handlePressMenuButton} />
      <ArticlesList 
        articles={articles} 
        fetching={fetching} 
        onLoadMore={this._loadMoreArticles.bind(this)}
      />
    </View>
  }

  _handlePressMenuButton() {

  }

  _loadMoreArticles () {
    let {page_number, page_count} = this.props.articles_meta;

    if (page_count > page_number) {
      this.props.dispatch(loadArticles(page_number+1))
    }
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
    fetching: state.articles.get('fetching')
  };
};

ArticlesListScene = connect(
  mapStateToProps
)(ArticlesListScene);

export default ArticlesListScene;
