(function () {
  'use strict';

  var root = document.querySelector('[data-search-root]');
  if (!root) return;
  var form = root.querySelector('.search-form');
  var input = form.querySelector('input[name="q"]');
  var tagsRoot = root.querySelector('[data-search-tags]');
  var status = root.querySelector('[data-search-status]');
  var resultsRoot = root.querySelector('[data-search-results]');
  var moreWrap = root.querySelector('.search-more');
  var moreButton = root.querySelector('[data-search-more]');
  var docs = [];
  var matches = [];
  var shown = 0;
  var pageSize = 20;
  var timer;

  function normalize(value) { return String(value || '').normalize('NFC').toLowerCase(); }
  function tokens(value) { return normalize(value).split(/\s+/).filter(Boolean); }
  function selectedTags() {
    return Array.prototype.slice.call(tagsRoot.querySelectorAll('input:checked')).map(function (input) { return input.value; });
  }
  function score(doc, words) {
    var title = normalize(doc.title), tags = normalize((doc.tags || []).join(' '));
    var summary = normalize(doc.summary), content = normalize(doc.content);
    var total = 0;
    for (var i = 0; i < words.length; i += 1) {
      var word = words[i];
      if (title.indexOf(word) >= 0) total += 8;
      else if (tags.indexOf(word) >= 0) total += 5;
      else if (summary.indexOf(word) >= 0) total += 3;
      else if (content.indexOf(word) >= 0) total += 1;
      else return -1;
    }
    return total;
  }
  function element(name, className, text) {
    var node = document.createElement(name);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function renderMore() {
    var end = Math.min(shown + pageSize, matches.length);
    for (var i = shown; i < end; i += 1) {
      var doc = matches[i].doc;
      var item = element('li');
      var heading = element('h2');
      var link = element('a', '', doc.title);
      link.href = doc.url;
      heading.appendChild(link);
      item.appendChild(heading);
      if (doc.date) item.appendChild(element('time', 'post-meta', doc.date));
      item.appendChild(element('p', '', doc.summary || doc.content.slice(0, 180)));
      resultsRoot.appendChild(item);
    }
    shown = end;
    moreWrap.hidden = shown >= matches.length;
  }
  function syncUrl(query, tags) {
    var params = new URLSearchParams();
    if (query) params.set('q', query);
    tags.forEach(function (tag) { params.append('tag', tag); });
    history.replaceState(null, '', location.pathname + (params.toString() ? '?' + params : ''));
  }
  function search() {
    var query = input.value.trim();
    var words = tokens(query);
    var tags = selectedTags();
    matches = docs.map(function (doc) { return { doc: doc, score: score(doc, words) }; }).filter(function (row) {
      if (row.score < 0) return false;
      return tags.every(function (tag) { return (row.doc.tags || []).indexOf(tag) >= 0; });
    }).sort(function (a, b) { return b.score - a.score || String(b.doc.date).localeCompare(String(a.doc.date)); });
    resultsRoot.replaceChildren();
    shown = 0;
    status.textContent = (query || tags.length ? '검색 결과 ' : '전체 콘텐츠 ') + matches.length + '건';
    syncUrl(query, tags);
    renderMore();
  }
  function buildTags() {
    var params = new URLSearchParams(location.search);
    var selected = params.getAll('tag');
    var tags = [];
    docs.forEach(function (doc) { (doc.tags || []).forEach(function (tag) { if (tags.indexOf(tag) < 0) tags.push(tag); }); });
    tags.sort().forEach(function (tag, index) {
      var label = element('label');
      var checkbox = element('input');
      checkbox.type = 'checkbox'; checkbox.value = tag; checkbox.id = 'search-tag-' + index; checkbox.checked = selected.indexOf(tag) >= 0;
      label.appendChild(checkbox); label.appendChild(document.createTextNode(tag)); tagsRoot.appendChild(label);
      checkbox.addEventListener('change', search);
    });
    input.value = params.get('q') || '';
  }

  form.addEventListener('submit', function (event) { event.preventDefault(); search(); });
  input.addEventListener('input', function () { clearTimeout(timer); timer = setTimeout(search, 180); });
  moreButton.addEventListener('click', renderMore);
  fetch(root.dataset.index, { credentials: 'same-origin' }).then(function (response) {
    if (!response.ok) throw new Error(String(response.status));
    return response.json();
  }).then(function (data) {
    docs = Array.isArray(data) ? data : [];
    buildTags();
    search();
  }).catch(function () { status.textContent = '검색 색인을 불러오지 못했습니다.'; });
}());
