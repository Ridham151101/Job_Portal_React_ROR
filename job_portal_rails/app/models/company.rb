class Company < ApplicationRecord
  belongs_to :company_creator, class_name: "User"
  has_many :jobs, dependent: :destroy
  has_many :reviews, dependent: :destroy
end
