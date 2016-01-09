class CreateAnnotations < ActiveRecord::Migration
  def change
    create_table :annotations do |t|
      t.string :category
      t.integer :start
      t.integer :end
      t.string :string_within_text

      t.timestamps null: false
    end
  end
end
