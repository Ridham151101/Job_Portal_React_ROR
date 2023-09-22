class CreatePortfolios < ActiveRecord::Migration[6.1]
  def change
    create_table :portfolios do |t|
      t.string :title
      t.text :experience
      t.text :about_user
      t.text :skills
      t.text :education
      t.text :linkdin_url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
