class CompanySerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description, :address, :email, :phone_number, :created_at, :job_creator_name

  attribute :job_creator_name do |object|
    User.find(object.job_creator_id).name
  end
end
