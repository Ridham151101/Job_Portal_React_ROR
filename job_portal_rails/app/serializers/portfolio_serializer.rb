class PortfolioSerializer
  include JSONAPI::Serializer
  attributes :id, :title, :about_user, :experience, :linkdin_url, :skills, :education
end
