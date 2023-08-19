class Job < ApplicationRecord
  belongs_to :job_creator, class_name: "User"
  belongs_to :company
  has_many :job_applications, dependent: :destroy

  enum status: { open: 0, closed: 1 }
end
