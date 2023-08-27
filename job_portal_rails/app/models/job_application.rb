class JobApplication < ApplicationRecord
  has_one_attached :resume
  belongs_to :job_seeker, class_name: "User"
  belongs_to :job

  validates :name, presence: true
  validates :resume, content_type: { content_type: ['application/pdf'], message: 'only PDF files are allowed' }, presence: :true
  validates :email, presence: true, uniqueness: true
  validates :phone_number,format:  { with: /\A\d{10}\z/}
end
