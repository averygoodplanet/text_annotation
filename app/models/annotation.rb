class Annotation < ActiveRecord::Base
  belongs_to :annotated_file
end
