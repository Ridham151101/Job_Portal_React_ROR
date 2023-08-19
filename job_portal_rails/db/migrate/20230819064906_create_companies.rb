class CreateCompanies < ActiveRecord::Migration[6.1]
  def change
    create_table :companies do |t|
      t.string :name
      t.text :description
      t.text :address
      t.string :email
      t.string :phone_number
      t.references :job_creator, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
  end
end
