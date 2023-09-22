class CreateReviews < ActiveRecord::Migration[6.1]
  def change
    create_table :reviews do |t|
      t.text :review_text
      t.integer :rating
      t.references :job_seeker, null: false, foreign_key: { to_table: :users }
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
