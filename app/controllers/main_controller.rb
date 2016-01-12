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

    @raw_text = file.full_text
  end
end