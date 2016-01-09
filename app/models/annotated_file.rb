class AnnotatedFile < ActiveRecord::Base
  has_many :annotations
end
