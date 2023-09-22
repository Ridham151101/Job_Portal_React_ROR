class ReviewSerializer
  include JSONAPI::Serializer
  attributes :id, :review_text, :rating, :created_at

  belongs_to :job_seeker, class_name: "User", serializer: UserSerializer

  attribute :job_seeker_name do |object|
    object.job_seeker.name
  end
end
