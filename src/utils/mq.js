import {Dimensions} from 'react-native';
import _ from 'lodash';

const getDimensions = () => {
  return Dimensions.get('window');
}

export const createStyles = (baseStyles) => {
  let baseRules = getBaseRules(baseStyles);
  let mediaRules = getMediaRules(baseStyles);

  let styles = getParsedStyles(baseRules, mediaRules);

  console.log(styles);

  return styles
}

function getBaseRules (baseStyles) {
  let styles = {};

  _.each(baseStyles, (attrs, key) => {
    if (_.includes(key, '@media') == false) {
      styles[key] = attrs;
    }
  });

  return styles;
}

function getMediaRules (baseStyles) {
  let mediaRules = [];

  _.each(baseStyles, (attrs, key) => {
    if (_.includes(key, '@media')) {
      mediaRules.push(getMediaRule(key, attrs));
    }
  });

  return mediaRules;
}

function getMediaRule (media, attrs) {
  let mediaRules = {
    rules: [],
    attrs: attrs
  };

  let medias = _.split(media, 'and');

  _.each(medias, media => {
    let rule = {};

    if (_.includes(media, 'min-width')) {
      rule.type = 'min-width';
    }

    if (_.includes(media, 'max-width')) {
      rule.type = 'max-width';
    }

    if (_.includes(media, 'min-height')) {
      rule.type = 'min-height';
    }

    if (_.includes(media, 'max-height')) {
      rule.type = 'max-height';
    }

    rule.value = getMediaValue(media);

    mediaRules.rules.push(rule);
  });

  return mediaRules;
}

function getMediaValue (media) {
  let numbers = media.match(/\d/g);
  let value = numbers.join('');

  return value;
}

function getParsedStyles(baseStyles, mediaRules) {
  let dimensions = getDimensions();

  _.each(mediaRules, mediaRule => {
    let rules = mediaRule.rules;
    let attrs = mediaRule.attrs;
    let applyRule = true;

    _.each(rules, rule => {
      if (validRule(rule, dimensions) == false) {
        applyRule = false;
      }
    });

    if (applyRule) {
      _.assign(baseStyles, attrs);
    }
  });

  return baseStyles;
}


function validRule(rule, dimensions) {
  if (rule.type == 'max-width') {
    if (dimensions.width <= rule.value) {
      return true;
    } else {
      return false;
    }
  }

  if (rule.type == 'max-height') {
    if (dimensions.height <= rule.value) {
      return true;
    } else {
      return false;
    }
  }

  if (rule.type == 'min-width') {
    if (dimensions.width >= rule.value) {
      return true;
    } else {
      return false;
    }
  }

  if (rule.type == 'min-height') {
    if (dimensions.height >= rule.value) {
      return true;
    } else {
      return false;
    }
  }
}
