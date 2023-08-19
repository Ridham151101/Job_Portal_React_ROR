class Company < ApplicationRecord
  belongs_to :job_creator, class_name: "User"
end
