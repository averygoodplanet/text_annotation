$( document ).ready(function() {
  // var annotations is set in index.html.haml

  function rangesFromAnnotations() {
    var ranges = []
    var color = ''

    $.each( annotations, function (i, ann) {

      switch (ann['category']) {
        case 'LOCATION':
          color = '#00FF00';
          break
        case 'ORGANIZATION':
          color = '#33CCFF';
          break
        case 'PERSON':
          color = '#FF6600';
          break
      }

      this_range = {
        color: color,
        start: ann['start'],
        length: (ann['end'] - ann['start']) + 1
      }

      ranges.push(this_range)
    });
    return ranges;
  }

  function redrawAllHighlights() {
    // this clears all highlights and seems to be required 
    // after you have drawn highlights before
    $('textarea').highlightTextarea('destroy');

    // draw highlights
    $('textarea').highlightTextarea({
      ranges: rangesFromAnnotations()
    });
  }

  redrawAllHighlights();
  
  $('textarea').select(function() {
    /// get position etc of mouse-selected text
    info = $('textarea').textrange();
    console.log("text was selected by mouse:")
    // e.g. {position: 1121, start: 1121, end: 1142, length: 21, text: ", a little timidly, '"}
    console.log(info);
    // debugger;
  });
});