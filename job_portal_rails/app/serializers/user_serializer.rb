class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :email, :name, :gender, :role

  attribute :role do |object|
    object.roles.first.name if object.roles.present?
  end
end
