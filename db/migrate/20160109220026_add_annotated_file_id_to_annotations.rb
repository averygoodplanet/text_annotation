class AddAnnotatedFileIdToAnnotations < ActiveRecord::Migration
  def change
    add_column :annotations, :annotated_file_id, :integer
  end
end
