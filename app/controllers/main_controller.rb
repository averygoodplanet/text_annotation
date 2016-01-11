class MainController < ApplicationController
  def index
    default = 'ch08'
    # current functionality just loads one file, 'ch08'
    filename = params[:filename] || default

    file = AnnotatedFile.find_by(filename: filename)

    if file.blank?
      flash[:alert] = "ERROR: File was not found for filename #{filename}--you may need to run" +
                              " the rake task, e.g. rake data:load_data['ch08'] for the file prefix first."
      return
    end

    raw_text = file.full_text

    html = ''
    resume_raw_index = nil
    data_id = -1
    in_between_string = ''

    # build up html from raw_text and annotations
    annotations = (file.annotations || []).sort_by{|a| a[:start]}

    annotations.each do | a |
      selected_raw_text = a.string_within_text
      category = a.category
      data_id += 1

      if resume_raw_index.present?
        in_between_string = raw_text[resume_raw_index..a.start - 1]
      end

      html += in_between_string
      # tooltip from http://webdesignerhut.com/pure-css-tooltips-with-html5-data-attribute/
      html_segment = %[<mark data-id="#{data_id}" class="tooltip tooltip-top" data-tooltip="#{category}"] +
                                    %[data-start="#{a.start}" data-end="#{a.end}">#{selected_raw_text}</mark>]    
      html += html_segment

      resume_raw_index = a.end + 1
    end
    @full_text_html = html
  end
end