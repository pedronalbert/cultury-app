/* Dependencies */
import React, {
  Component,
  PropTypes
} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

/* Components */
import IconButton from '../../../components/IconButton';

class NavBar extends Component {
  constructor (props) {
    super(props);

    this.state = {
      searchOpen: false,
      searchText: ''
    };
  }

  render () {
    let renderTitle = this._renderTitle.bind(this);
    let renderSearchInput = this._renderSearchInput.bind(this);
    let renderSearchButton = this._renderSearchButton.bind(this);
    let renderCloseSearchButton = this._renderCloseSearchButton.bind(this);
    let renderLeftIcon = this._renderLeftIcon.bind(this);

    return <View style={styles.root}>
      {renderLeftIcon()}
      {renderTitle()}
      {renderSearchInput()}
      {renderSearchButton()}
      {renderCloseSearchButton()}
    </View>
  }

  _renderLeftIcon () {
    if (this.props.leftIcon && this.state.searchOpen == false) {
      return this.props.leftIcon
    }
  }

  _renderSearchButton () {
    if (this.props.searchable) {

      if (this.state.searchOpen == false) {
        
        return <IconButton iconName='search' onPress={this.openSearch.bind(this)} />
      }
    }
  }

  _renderTitle () {
    if (this.state.searchOpen == false) {
      return <Text style={styles.title}>{this.props.title}</Text>
    }
  }

  _renderSearchInput () {
    let handleChangeText = this._handleChangeSearchText.bind(this);
    let handleSubmitEditing = this._handleSubmitSearch.bind(this);

    if (this.props.searchable && this.state.searchOpen) {
      return <TextInput
        ref='searchInput'
        style={styles.searchInput}
        value={this.state.searchText}
        onChangeText={handleChangeText}
        onSubmitEditing={handleSubmitEditing}
        onEndEditing={handleSubmitEditing}
      />
    }
  }

  _renderCloseSearchButton () {
    if (this.state.searchOpen) {
      return <IconButton iconName='close' onPress={this.closeSearch.bind(this)} />
    }
  }

  _handleChangeSearchText (newText) {
    this.setState({
      searchText: newText
    });

    if (this.props.onChangeSearchText) {
      return this.props.onChangeSearchText(newText);
    }
  }

  _handleSubmitSearch () {
    if (this.props.onSubmitSearch) {
      return this.props.onSubmitSearch(this.state.searchText);
    }
  }

  openSearch () {
    this.setState({
      searchOpen: true
    }, () => {
      if (this.props.onOpenSearch) {
        this.props.onOpenSearch();
      }
      
      this.refs.searchInput.focus();
    });
  }

  closeSearch () {
    if (this.props.searchable && this.state.searchOpen) {
      this.setState({
        searchOpen: false,
      }, () => {
        this._handleChangeSearchText('');
        if (this.props.onCloseSearch) {
          this.props.onCloseSearch();
        }

      });
    }
  }
}

const styles = StyleSheet.create({
  root: {
    height: 56,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 14
  },

  searchInput: {
    flex: 1,
    height: 48,
    color: 'white',
    fontSize: 14
  }
});

NavBar.defaultProps = {
  searchable: false
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
  searchable: PropTypes.bool,
  onOpenSearch: PropTypes.func,
  onCloseSearch: PropTypes.func,
  onChangeSearchText: PropTypes.func,
  onSubmitSearch: PropTypes.func
};

export default NavBar;
