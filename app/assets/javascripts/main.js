$( document ).ready(function() {
  // var annotations is set in index.html.haml
  var highestCreatedDataId = annotations[annotations.length - 1]['id'];

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
  
  // on text selection with mouse, add a new annotation
  // or delete existing annotation
  // this can error if there is a selection of a substring that spans both an existing
  // annotation and non-annotated text at the same time (maybe a future feature fix)
  $('textarea').select(function() {
    /// get position etc of mouse-selected text
    selectionObject = $('textarea').textrange();
    // e.g. {position: 1121, start: 1121, end: 1142, length: 21, text: ", a little timidly, '"}

    // we assume each annotation has a unique start index
    // we don't support nested annotations
    var selectionInAnnotations = $.grep(annotations, function(e){ return e.start == selectionObject['start']; });

    if (selectionInAnnotations.length) {
      // select an existing annotation to delete it
      annotations = $.grep(annotations, function(e){ 
           return e.id != selectionInAnnotations[0].id; 
      });
      redrawAllHighlights();
    } else {
      // select text without annotation to add an annotation
      var category = '';
      switch ($('select option:selected').val()) {
        case '1':
          category = 'LOCATION';
          break
        case '2':
          category = 'ORGANIZATION';
          break
        case '3':
          category = 'PERSON';
          break
      }

      highestCreatedDataId += 1;
      var newAnnotation = {
        category: category,
        id: highestCreatedDataId,
        start: selectionObject['start'],
        end: selectionObject['end'] - 1,
        string_within_text: selectionObject['text']
      }
      annotations.push(newAnnotation);
      redrawAllHighlights();
    }
  });

  $('button').click( function(){
    console.log(annotations);
  });
});