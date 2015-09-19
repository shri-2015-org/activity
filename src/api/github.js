import fetch from './fetch';
import { assign } from 'lodash';
import { format, parse } from 'url';

const API_URL = 'https://api.github.com';
const parsedURL = parse(API_URL);

export function comments(owner, repo) {
  var newParsedUrl = assign({}, parsedURL, {
    pathname: `repos/${owner}/${repo}/comments`
  });

  return fetch(format(newParsedUrl));
}

export function commits(owner, repo) {
  var newParsedUrl = assign({}, parsedURL, {
    pathname: `repos/${owner}/${repo}/commits`
  });

  return fetch(format(newParsedUrl));
}
