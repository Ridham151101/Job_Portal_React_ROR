class User < ApplicationRecord
  rolify
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, 
         :jwt_authenticatable, jwt_revocation_strategy: self

  has_many :portfolios, dependent: :destroy
  has_many :companies, foreign_key: :company_creator_id, class_name: "Company", dependent: :destroy
  has_many :jobs, foreign_key: :job_creator_id, class_name: "Job", dependent: :destroy
  has_many :job_applications, foreign_key: :job_seeker_id, class_name: "JobApplication"
end
