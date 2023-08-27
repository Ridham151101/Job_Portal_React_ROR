class Review < ApplicationRecord
  belongs_to :job_seeker, class_name: "User"
  belongs_to :company

  validates :review_text, presence: true
  validates :rating, presence: true, inclusion: { in: 1..5 }
end
