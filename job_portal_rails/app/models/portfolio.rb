class Portfolio < ApplicationRecord
  belongs_to :user

  validates :title, presence: true, length: { maximum: 100 }
  validates :about_user, presence: true, length: { maximum: 500 }
  validates :skills, :education, :experience, presence: true
  validates :linkdin_url, presence: true, format: { with: URI::DEFAULT_PARSER.make_regexp }
end
