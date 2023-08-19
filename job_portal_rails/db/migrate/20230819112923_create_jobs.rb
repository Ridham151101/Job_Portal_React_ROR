class CreateJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :jobs do |t|
      t.string :title
      t.string :location
      t.integer :salary
      t.text :requirments
      t.integer :openings
      t.integer :status
      t.references :job_creator, null: false, foreign_key: { to_table: :users }
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
