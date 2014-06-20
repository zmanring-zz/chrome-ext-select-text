chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {

  if (request.method === 'getSelection') {
    sendResponse({data: window.getSelection().toString()});
  }

  if (request.method === 'searchResults') {

    // clear previous
    $('#spotify-results').remove();

    var results = request.data.items;
    var html = '';

    html += '<article id="spotify-results"><div><img class="logo" src="https://d2c87l0yth4zbw.cloudfront.net/i/_global/logo.png" /><p>Found {total} artists based on "{selectedText}"</p><a href="https://www.spotify.com" target="_blank">Get Spotify</a></div>'
    .replace(/{total}/g, request.data.total)
    .replace(/{selectedText}/g, request.selectedText);

    if (results.length > 0) {

      html += '<ul>';

      for (var i = 0; i < results.length; i++) {

        html += '<li><a href="{href}" title="{title}" target="_blank"><img src="{imageUrl}" /><span>{title}</span></a></li>'
        .replace(/{href}/g, results[i].external_urls.spotify)
        .replace(/{title}/g, results[i].name)
        .replace(/{imageUrl}/g, (results[i]['images'].length > 0) ? results[i]['images'][0].url : 'http://fc01.deviantart.net/fs70/i/2010/135/2/d/No_Cover_Mac_Style_by_figure002.png');

      }

      html += '</ul>';

    }

    html += '<button class="close">&times;</button></<article>';

    $('body').append(html);

  }

  // events
  $(document).on('click', '#spotify-results .close', function() {
    $('#spotify-results').remove();
  });

});
