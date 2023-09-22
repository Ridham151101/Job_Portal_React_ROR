class JobSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :location, :salary, :requirments, :openings, :status, :created_at, :job_creator_name

  attribute :job_creator_name do |object|
    User.find(object.job_creator_id).name
  end
end
