chrome.contextMenus.create({
  id: 'chrome-select-text',
  contexts: ['selection'],
  title: 'Search Spotify',
  onclick: getSelection
});

function getSelection (contextMenu, tab) {

  chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response){
    var selectedText = response.data;

    $.ajax({
      url: 'https://api.spotify.com/v1/search',
      data: {
        q: selectedText,
        type: 'artist'
      },
      success: function (response) {

        if (response.artists) {
          chrome.tabs.sendRequest(tab.id, {method: "searchResults", data: response.artists, selectedText: selectedText});
        }

      }

    });

  });

};
