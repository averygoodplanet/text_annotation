console.log('Firing up annotator');
console.log('The RoutingError for annotator-full.in.map in rails is a Chrome Dev tools artifact.');
jQuery(function ($) {
    $('pre').annotator()
                          .annotator('addPlugin', 'Tags')
                          .annotator('addPlugin', 'Filter', {
                            filters: [
                              {
                                label: 'Tag',
                                property: 'tags'
                              }
                            ]
                            });
});