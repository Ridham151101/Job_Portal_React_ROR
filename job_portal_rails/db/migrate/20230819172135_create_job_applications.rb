class CreateJobApplications < ActiveRecord::Migration[6.1]
  def change
    create_table :job_applications do |t|
      t.string :name
      t.string :email
      t.string :phone_number
      t.text :address
      t.integer :notice_period_in_month
      t.float :cctc
      t.float :ectc
      t.integer :experience_in_years
      t.references :job_seeker, null: false, foreign_key: { to_table: :users }
      t.references :job, null: false, foreign_key: true

      t.timestamps
    end
  end
end
