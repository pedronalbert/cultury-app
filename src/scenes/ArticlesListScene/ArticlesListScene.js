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
    return this.props.dispatch(loadArticles());
  }
  
  render () {
    let handlePressMenuButton = this._handlePressMenuButton.bind(this);
    let articles = this.props.articles;

    return <View style={styles.root}>
      <NavBar onPressMenuButton={handlePressMenuButton} />
      <ArticlesList articles={articles} />
    </View>
  }

  _handlePressMenuButton() {
    this.props.dispatch(loadArticles());
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
  let fetchingArticles;

  articlesIds.forEach(articleId => {
    let article = state.entities.getIn(['articles', articleId.toString()]);

    if (article) {
      articles.push(article.toJS());
    }
  })

  fetchingArticles = state.articles.get('fetching');

  return {
    articles: articles,
    fetchingArticles: fetchingArticles
  };
};

ArticlesListScene = connect(
  mapStateToProps
)(ArticlesListScene);

export default ArticlesListScene;
