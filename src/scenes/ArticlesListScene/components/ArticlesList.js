/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

/* Components */
import ArticleCard from './ArticleCard';
import ScrollView from '../../../components/ScrollView';

class ArticlesList extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let { articles, fetching, errorMessage } = this.props;

    if (articles.length > 0 || fetching || errorMessage) {
      return <ScrollView
        fetching={fetching}
        errorMessage={errorMessage}
        onEndReached={this.props.onLoadMore}
        onPressRetryButton={this.props.onPressRetryButton}
      >
        {articles.map(article => {
          return <ArticleCard key={article.id} article={article} />
        })}
      </ScrollView>
    } else {
      return <View style={styles.notFoundContainer}>
        <Text>No se han encontrado artículos</Text>
      </View>
    }
  }
}

const styles = StyleSheet.create({
  notFoundContainer: {
    padding: 16,
    alignItems: 'center'
  }
});
ArticlesList.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onLoadMore: PropTypes.func.isRequired,
  onPressRetryButton: PropTypes.func.isRequired
};

export default ArticlesList;
