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
    // so that it matches the way we count the end in selection in Annotations
    selectionObject.trueEnd = selectionObject['end'] - 1;
    // e.g. {position: 1121, start: 1121, end: 1142, length: 21, text: ", a little timidly, '"}

    // we assume each annotation has a unique start index
    var selectionInAnnotations = $.grep(annotations, function(e){ return e.start == selectionObject['start']; });

    if (selectionInAnnotations.length) {
      // We don't support nested annotations.
      // This prevents the error of selecting the start (per above conditionals) of an 
      // existing annotation to somewhere other than the real end of the existing
      // annotation.
      if (selectionObject.trueEnd != selectionInAnnotations[0].end) {
        alert('Nested annotations are not allowed.');
        // exit the function
        return;
      }

      // select an existing annotation to delete it
      annotations = $.grep(annotations, function(e){ 
           return e.id != selectionInAnnotations[0].id; 
      });
      redrawAllHighlights();
    } else {
      // select text without an existing annotation in order to add an annotation

      // check that the selection doesn't start  inside an existing annotation
      debugger;

      // check that the selection doesn't end inside an existing annotation

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
        end: selectionObject['trueEnd'],
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