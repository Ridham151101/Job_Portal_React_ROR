class CompanySerializer
  include JSONAPI::Serializer
  attributes :id, :name, :description, :address, :email, :phone_number, :created_at, :company_creator_name

  attribute :company_creator_name do |object|
    User.find(object.company_creator_id).name
  end
end
