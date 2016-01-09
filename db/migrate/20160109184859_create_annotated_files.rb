class CreateAnnotatedFiles < ActiveRecord::Migration
  def change
    create_table :annotated_files do |t|
      t.string :filename
      t.text :full_text

      t.timestamps null: false
    end
  end
end
