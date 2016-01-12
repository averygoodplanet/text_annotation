$( document ).ready(function() {

  // test out highlighting
  // light green #00ff00 LOCATION
  // light blue #33ccff ORGANIZATION
  // light orange #ff6600 PERSON
  $('textarea').highlightTextarea({
    ranges: [{
      color: '#ADF0FF',
      start: 0,
      length: 10
    }, {
      color: '#FFFF00',
      ranges: [[40,45], [50,55]]
    }]
  });

  $('textarea').select(function() {
    /// get position etc of mouse-selected text
    info = $('textarea').textrange();
    console.log("text was selected by mouse:")
    // e.g. {position: 1121, start: 1121, end: 1142, length: 21, text: ", a little timidly, '"}
    console.log(info);
    // debugger;
  });
});