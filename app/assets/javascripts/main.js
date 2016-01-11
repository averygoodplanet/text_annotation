$( document ).ready(function() {

  // Delete the annotation on double-click
  $('#full_text').on('dblclick', 'mark', function() {
    stringWithoutTag = $(this).text();
    // remove the mark tag and replace with text
    $(this).replaceWith(stringWithoutTag);
  });


});