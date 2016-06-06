/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

/* Components */
import ArticleCard from './ArticleCard';

class ArticlesList extends Component {
  render () {
    let { articles } = this.props;

    return <ScrollView style={styles.root}>
      {articles.map(article => {
        return <ArticleCard key={article.id} article={article} />
      })}
    </ScrollView>
  }
}

const styles = StyleSheet.create({
  root: {
  }
});

ArticlesList.propTypes = {
  articles: PropTypes.array.isRequired
};

export default ArticlesList;
