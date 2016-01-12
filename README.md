# text_annotation

This project simulates a simple text-annotation system.

First run rake data:load_data['ch08'], and then go to localhost:3000/.

The page loads annotations from data originally parsed from XML files and saved in ActiveRecord.
Users can delete an existing annotation by selecting it with the mouse.
Users can create new annotations by selecting unannotated text with the mouse.

The colors correspond to different annotation categories in the select element.

Clicking Save will display JSON containing all current annotations in the browser.

An error will occur if a mouse selection is made that contains boths already-highlighted text, and non-highlighted text.
This is a possible fix to consider in the future.

As of 1/12/2016 this is running on Heroku http://cryptic-chamber-5262.herokuapp.com/