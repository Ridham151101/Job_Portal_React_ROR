class Company < ApplicationRecord
  belongs_to :company_creator, class_name: "User"
  has_many :jobs
end